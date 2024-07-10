### Eingabevalidierungsfehler

- **Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')**
    - **CWE-79**: Cross-Site Scripting (XSS) kann auftreten, wenn Benutzereingaben nicht ordnungsgemäß validiert und bereinigt werden.
- **Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')**
    - **CWE-89**: SQL Injection kann auftreten, wenn Benutzereingaben direkt in SQL-Abfragen eingebettet werden, ohne ordnungsgemäß bereinigt zu werden.
- **Improper Input Validation**
    - **CWE-20**: Allgemeine Eingabevalidierungsfehler, die zu verschiedenen Schwachstellen führen können.
- **Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')**
    - **CWE-22**: Path Traversal kann auftreten, wenn Benutzereingaben verwendet werden, um Dateipfade zu erstellen, ohne diese ordnungsgemäß zu bereinigen.

### Authentifizierungs- und Autorisierungsfehler

- **Improper Authentication**
    - **CWE-287**: Unsichere Authentifizierungsmechanismen.
- **Incorrect Authorization**
    - **CWE-863**: Unsachgemäße Überprüfung von Benutzerrechten.
- **Use of Hard-coded Credentials**
    - **CWE-798**: Verwendung von hartcodierten Anmeldeinformationen.

### Webspezifische Fehler

- **Unrestricted Upload of File with Dangerous Type**
    - **CWE-434**: Unbeschränkter Upload von Dateien mit gefährlichen Typen.
- **Server-Side Request Forgery (SSRF)**
    - **CWE-918**: SSRF kann auftreten, wenn das Projekt serverseitige HTTP-Anfragen basierend auf Benutzereingaben durchführt, ohne die URLs ordnungsgemäß zu validieren.
