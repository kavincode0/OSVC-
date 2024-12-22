const Home = () => {
    return (
        <div>
            <h1>Open Source Vulnerability Checker</h1>
            <div className="content">
                <p>Enter your package details or upload a dependency file to analyze vulnerabilities</p>
            </div>

            <div>
                <form>
                    <div>
                        <label for="package-name">Package Name:</label>
                        <input type="text" id="package-name" name="package-name" placeholder="e.g., react"/>
                    </div>

                    <div>
                        <label for="package-version">Package Version:</label>
                        <input type="text" id="package-version" name="package-version" placeholder="e.g., 17.0.2"/>
                    </div>

                    <div>
                        <label for="dependency-file">Upload Dependency File:</label>
                        <input type="file" id="dependency-file" name="dependency-file" accept=".json, .txt, .xml"/>
                    </div>

                    <div>
                        <button type="submit">Analyze Vulnerabilities</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home