document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for the dot
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Smooth follow for the circle
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('scale-150', 'bg-white/10');
                cursor.classList.add('scale-50');
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('scale-150', 'bg-white/10');
                cursor.classList.remove('scale-50');
            });
        });
    }

    // --- GitHub Integration ---
    const githubUsername = window.siteConfig?.personal?.social?.github;
    if (githubUsername) {
        fetchGitHubData(githubUsername);
    }

    async function fetchGitHubData(username) {
        try {
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
            const reposData = await reposRes.json();

            if (Array.isArray(reposData)) {
                updateProjectsGrid(reposData);
            }
        } catch (error) {
            console.error('GitHub API Error:', error);
        }
    }

    function updateProjectsGrid(repos) {
        const grid = document.getElementById('projects-grid');
        if (!grid) return;

        const repoCards = repos.map(repo => `
            <a href="${repo.html_url}" target="_blank" class="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-2 rounded-lg bg-white/10 text-white group-hover:scale-110 transition-transform">
                        <i data-lucide="folder" class="w-5 h-5"></i>
                    </div>
                    <div class="flex items-center gap-3 text-xs font-mono text-gray-400">
                        <span class="flex items-center gap-1">
                            <i data-lucide="star" class="w-3 h-3"></i> ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            <i data-lucide="git-fork" class="w-3 h-3"></i> ${repo.forks_count}
                        </span>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-2 group-hover:text-white transition-colors">${repo.name}</h3>
                <p class="text-sm text-gray-400 mb-4 line-clamp-2 h-10">${repo.description || 'Açıklama yok.'}</p>
                <div class="flex flex-wrap gap-2">
                    ${repo.language ? `<span class="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300 font-mono">${repo.language}</span>` : ''}
                </div>
            </a>
        `).join('');

        grid.innerHTML = repoCards;
        lucide.createIcons();
    }

    // --- Discord Lanyard Integration ---
    const discordId = window.siteConfig?.personal?.social?.discord;
    const manualBanner = window.siteConfig?.personal?.banner;
    
    if (discordId) {
        const discordStatus = document.getElementById('discord-status');
        const discordAvatar = document.getElementById('discord-avatar');
        const discordActivitySection = document.getElementById('discord-activity-section');
        const topDiscordBanner = document.getElementById('top-discord-banner');
        
        const activityName = document.getElementById('activity-name');
        const activityDetails = document.getElementById('activity-details');
        const activityState = document.getElementById('activity-state');
        const activityImage = document.getElementById('activity-image');

        // Set Manual Banner Immediately if available
        if (manualBanner) {
            if (topDiscordBanner) {
                topDiscordBanner.src = manualBanner;
                topDiscordBanner.classList.remove('opacity-0');
            }
        }

        // Initial fetch for static data (Avatar, Banner)
        fetch(`https://api.lanyard.rest/v1/users/${discordId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const user = data.data.discord_user;
                    
                    // Avatar
                    if (user.avatar) {
                        const avatarUrl = `https://cdn.discordapp.com/avatars/${discordId}/${user.avatar}.png?size=512`;
                        discordAvatar.src = avatarUrl;
                    }

                    // Banner Logic:
                    // 1. If Lanyard has a banner, use it (it's the most up-to-date)
                    // 2. If not, keep the manual banner set above
                    // 3. If no manual banner, use fallback
                    
                    if (user.banner) {
                         const bannerUrl = `https://cdn.discordapp.com/banners/${discordId}/${user.banner}.png?size=1024`;
                         if (topDiscordBanner) {
                             topDiscordBanner.src = bannerUrl;
                             topDiscordBanner.classList.remove('opacity-0');
                         }
                    } else if (!manualBanner) {
                        // Fallback only if no manual banner is set
                        const fallbackUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
                        if (topDiscordBanner) {
                             topDiscordBanner.src = fallbackUrl;
                             topDiscordBanner.classList.remove('opacity-0');
                        }
                    }
                }
            })
            .catch(err => console.log("Lanyard fetch error:", err));

        // WebSocket for Real-time Presence
        const ws = new WebSocket('wss://api.lanyard.rest/socket');
        let heartbeatInterval;

        ws.onopen = () => {
            ws.send(JSON.stringify({
                op: 2,
                d: { subscribe_to_id: discordId }
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const { t, d, op } = data;

            if (op === 1) {
                heartbeatInterval = setInterval(() => {
                    ws.send(JSON.stringify({ op: 3 }));
                }, d.heartbeat_interval);
            }

            if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
                updateDiscordPresence(d);
            }
        };

        function updateDiscordPresence(data) {
            if (!data) return;

            // Status Color
            const statusColors = {
                online: '#22c55e',
                idle: '#eab308',
                dnd: '#ef4444',
                offline: '#6b7280'
            };
            discordStatus.style.backgroundColor = statusColors[data.discord_status] || statusColors.offline;
            discordStatus.title = data.discord_status;

            // Activity
            const activities = data.activities.filter(a => a.type !== 4); // Filter out custom status
            if (activities.length > 0) {
                const activity = activities[0];
                
                discordActivitySection.classList.remove('hidden');
                activityName.textContent = activity.name;
                activityDetails.textContent = activity.details || '';
                activityState.textContent = activity.state || '';

                if (activity.assets && activity.assets.large_image) {
                    let imageUrl = activity.assets.large_image;
                    if (imageUrl.startsWith('mp:')) {
                        imageUrl = `https://media.discordapp.net/${imageUrl.replace('mp:', '')}`;
                    } else {
                        imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
                    }
                    activityImage.src = imageUrl;
                    activityImage.classList.remove('hidden');
                } else {
                    activityImage.classList.add('hidden');
                }
            } else {
                discordActivitySection.classList.add('hidden');
            }
        }
    }
});