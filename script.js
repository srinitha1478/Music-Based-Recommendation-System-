document.addEventListener("DOMContentLoaded", () => {

    console.log("🎵 MoodTunes Website Loaded Successfully");

    const form = document.querySelector("form");
    const fileInput = document.querySelector('input[type="file"]');
    const outputSection = document.querySelector(".output");

    const statusMessage = document.createElement("div");
    statusMessage.style.marginTop = "20px";
    statusMessage.style.fontSize = "16px";
    statusMessage.style.color = "#4fc3f7";
    form.appendChild(statusMessage);

    const loader = document.createElement("div");
    loader.innerHTML = "🔄 Detecting mood, please wait...";
    loader.style.display = "none";
    loader.style.marginTop = "20px";
    loader.style.fontSize = "16px";
    loader.style.color = "#81d4fa";
    form.appendChild(loader);

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            statusMessage.textContent = `🎧 Selected Audio: ${fileName}`;
        } else {
            statusMessage.textContent = "";
        }
    });

  
    form.addEventListener("submit", (event) => {

        // Validate file upload
        if (!fileInput.files.length) {
            alert("⚠️ Please upload an audio file before submitting.");
            event.preventDefault();
            return;
        }

        const file = fileInput.files[0];
        const allowedTypes = ["audio/wav", "audio/x-wav", "audio/mpeg"];

        if (!allowedTypes.includes(file.type)) {
            alert("❌ Invalid file format. Please upload WAV or MP3 audio.");
            event.preventDefault();
            return;
        }

        // Hide previous output (if any)
        if (outputSection) {
            outputSection.style.display = "none";
        }

        // Show loader
        loader.style.display = "block";
        statusMessage.textContent = "📡 Uploading voice and analyzing emotion...";

        // Simulate processing delay (backend ML processing time)
        setTimeout(() => {
            loader.style.display = "none";
            statusMessage.textContent = "✅ Mood detected successfully! Generating playlist...";
        }, 2000);

      
    });

    if (outputSection) {
        setTimeout(() => {
            outputSection.scrollIntoView({ behavior: "smooth" });
        }, 500);
    }

    // Keyboard accessibility
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && document.activeElement === fileInput) {
            form.requestSubmit();
        }
    });

});
