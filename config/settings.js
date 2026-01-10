module.exports = {
    personal: {
        name: "",
        title: ".",
        description: ".",
        email: "",
        location: "",
        
        // Manuel Banner Tanımlama (Lanyard çekemezse veya özel banner için)
        // Discord Banner URL'nizi buraya yapıştırın
        banner: "",
        
        // Sosyal Medya Hesapları
        social: {
            discord: "", // Discord ID (Lanyard için ZORUNLU) eger calısmıyorsa https://discord.gg/smrtRhxbAb giriş yapin
            github: "", 
            linkedin: "https://linkedin.com/in/",
            twitter: "https://twitter.com/",
            instagram: "https://instagram.com/"
        }
    },
    
    // Tema Ayarları
    theme: {
        cursor: {
            enabled: true,
            color: "#ffffff", // İmleç rengi
            size: 20 // İmleç boyutu
        }
    },

    skills: [
        "Python", "JavaScript", "Node.js", "React", "AI/ML", "TensorFlow", "PyTorch", "Docker"
    ],

    // Projeler (GitHub'dan otomatik çekilir, buraya manuel ekleme yapılabilir)
    featuredProjects: []
};