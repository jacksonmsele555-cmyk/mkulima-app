// Jina la hifadhi yetu ya siri (Database Key)
const DATABASE_NAME = "MKULIMA_STORAGE_PRO";

// --- SEHEMU YA 1: KUTUMA DATA (Inafanya kazi kwenye form.html) ---
const fomuMkulima = document.getElementById('kilimoForm');

if (fomuMkulima) {
    fomuMkulima.addEventListener('submit', function(e) {
        e.preventDefault(); // Inazuia ukurasa usijifunge kwanza

        // Tunatengeneza kifurushi cha data (Object)
        const taarifaMpya = {
            id: Date.now(), // Namba ya kipekee ya ujumbe huu
            muda: new Date().toLocaleString('sw-TZ'), // Tarehe na saa ya Tanzania
            jina: document.getElementById('jina').value,
            zao: document.getElementById('zao').value,
            bei: document.getElementById('bei').value,
            simu: document.getElementById('simu').value
        };

        // Tunapakua database ya sasa au tunatengeneza mpya kama hamna
        let database = JSON.parse(localStorage.getItem(DATABASE_NAME)) || [];

        // Tunaongeza taarifa mpya kwenye list
        database.push(taarifaMpya);

        // Tunairudisha database iliyosasishwa kwenye storage
        localStorage.setItem(DATABASE_NAME, JSON.stringify(database));

        // Tunampa mkulima ujumbe wa mafanikio
        alert("✅ Safi! Taarifa zako zimetumwa kwa Admin.");

        // Tunamsafishia fomu
        this.reset();

        // Tunampeleka Admin kuona kama ujumbe umefika
        window.location.href = "admin.html";
    });
}

// --- SEHEMU YA 2: KUONYESHA DATA (Inafanya kazi kwenye admin.html) ---
const kiooChaAdmin = document.getElementById('adminBody');

if (kiooChaAdmin) {
    // Inaita data mara tu ukurasa wa Admin unapofunguka
    onyeshaUjumbeKwenyeTable();
}

function onyeshaUjumbeKwenyeTable() {
    let database = JSON.parse(localStorage.getItem(DATABASE_NAME)) || [];
    const tableBody = document.getElementById('adminBody');

    if (database.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center; padding:30px; color:#888;'>Bado hakuna ujumbe uliopokelewa.</td></tr>";
    } else {
        // Tunatengeneza mistari ya table kwa kila ujumbe
        tableBody.innerHTML = database.map(item => `
            <tr>
                <td>${item.muda}</td>
                <td><strong>${item.jina}</strong></td>
                <td>${item.zao}</td>
                <td style="color:#39FF14">Tsh ${Number(item.bei).toLocaleString()}</td>
                <td>${item.simu}</td>
                <td>
                    <button class="btn-del" onclick="futaTaarifa(${item.id})" style="background:#ff4d4d; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:4px;">Futa</button>
                </td>
            </tr>
        `).reverse().join(''); // Reverse inafanya ujumbe wa hivi karibuni uwe juu
    }
}

// --- SEHEMU YA 3: KUFUTA TAARIFA ---
function futaTaarifa(idYaKufuta) {
    if (confirm("Je, una uhakika unataka kufuta taarifa hii?")) {
        let database = JSON.parse(localStorage.getItem(DATABASE_NAME)) || [];

        // Tunachuja na kuacha kila kitu ISIPOKUWA hicho chenye ID hii
        database = database.filter(ujumbe => ujumbe.id !== idYaKufuta);

        // Tunahifadhi tena list mpya
        localStorage.setItem(DATABASE_NAME, JSON.stringify(database));

        // Tunaita tena function ya kuonyesha ili table ijifute
        onyeshaUjumbeKwenyeTable();
    }
}