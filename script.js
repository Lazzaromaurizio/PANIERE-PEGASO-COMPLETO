let risposte = [];

// Carica il file JSON esterno
fetch("risposte.json")
    .then(response => response.json())
    .then(data => {
        risposte = data;
        document.getElementById("results").innerHTML =
            "<p class='text-muted'>Inserisci una parola chiave per iniziare la ricerca.</p>";
    })
    .catch(err => {
        document.getElementById("results").innerHTML =
            "<p class='text-danger'>Errore nel caricamento del file JSON.</p>";
        console.error(err);
    });

function search() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const resultsDiv = document.getElementById("results");

    if (!query) {
        resultsDiv.innerHTML = "<p class='text-danger'>Inserisci almeno una parola chiave.</p>";
        return;
    }

    const keywords = query.split(" ");

    const risultati = risposte.filter(r =>
        keywords.every(kw => r.testo.toLowerCase().includes(kw))
    );

    if (risultati.length === 0) {
        resultsDiv.innerHTML = "<p class='text-warning'>Nessuna risposta trovata.</p>";
        return;
    }

    resultsDiv.innerHTML = risultati
        .map(r => `<p><strong>Risposta ${r.id}:</strong> ${r.testo}</p>`)
        .join("");
}
