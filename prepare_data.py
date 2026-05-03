import pandas as pd
import json

# 1. Read the full dataset to get chart data
df = pd.read_csv("anomaly_results/scored_dataset.csv")

# Ensure 'start' is datetime and sort
df['start'] = pd.to_datetime(df['start'])
df = df.sort_values('start')

# Get the last 336 hours (2 weeks)
recent_df = df.tail(336).copy()

# For the chart, we want timestamp, consumption, and whether it was an anomaly
chart_data = []
for _, row in recent_df.iterrows():
    chart_data.append({
        "timestamp": row['start'].strftime('%Y-%m-%d %H:%M'),
        "consumption": round(row['consumption'], 1),
        "ensemble_score": round(row['ensemble_score'], 3),
        "is_anomaly": int(row['anom_ensemble']) == 1,
        "anomaly_type": row['anomaly_type'] if pd.notna(row['anomaly_type']) else None,
        "severity": row['severity'] if pd.notna(row['severity']) else None
    })

with open("public/chart_data.json", "w") as f:
    json.dump(chart_data, f)

# 2. Extract recent anomalies for the table
anomalies_df = pd.read_csv("anomaly_results/detected_anomalies.csv")
anomalies_df['start'] = pd.to_datetime(anomalies_df['start'])
anomalies_df = anomalies_df.sort_values('start', ascending=False)

# Get the top 50 most recent anomalies
recent_anomalies = anomalies_df.head(50).copy()

table_data = []
for i, row in recent_anomalies.iterrows():
    table_data.append({
        "id": i,
        "timestamp": row['start'].strftime('%Y-%m-%d %H:%M:%S'),
        "consumption": f"{row['consumption']:.1f} MWh",
        "ensemble_score": round(row['ensemble_score'], 3),
        "anomaly_type": row['anomaly_type'],
        "severity": row['severity'],
        "isCritical": row['severity'] == 'CRITICAL'
    })

with open("public/anomaly_table.json", "w") as f:
    json.dump(table_data, f)

print("Data extracted successfully!")
