import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import matplotlib.pyplot as plt
from io import BytesIO
import base64

app = FastAPI()

# Define the expected structure for the incoming data
class VulnerabilityData(BaseModel):
    critical: int
    high: int
    medium: int
    low: int

# POST route to analyze vulnerabilities
@app.post("/analyze")
def analyze(data: VulnerabilityData):
    labels = ['Critical', 'High', 'Medium', 'Low']
    sizes = [data.critical, data.high, data.medium, data.low]
    colors = ['red', 'orange', 'yellow', 'green']
    explode = (0.1, 0, 0, 0)

    # Create the pie chart
    plt.figure(figsize=(6, 6))
    plt.pie(
        sizes,
        explode=explode,
        labels=labels,
        colors=colors,
        autopct='%1.1f%%',
        shadow=True,
        startangle=140
    )
    plt.axis('equal')

    # Convert the plot to a base64-encoded PNG image
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    buffer.close()

    # Calculate the average severity
    total = sum(sizes)
    avg_severity = sum([data.critical * 4, data.high * 3, data.medium * 2, data.low]) / (total if total else 1)
    severity_status = "Severe" if avg_severity >= 3 else "Moderate" if avg_severity >= 2 else "Low"

    # Return the severity status and the chart
    return {"severity": severity_status, "chart": img_base64}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)
