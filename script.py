import pandas as pd
import json
from datetime import datetime, timedelta
import random

# Create sample model data that represents what might be in your CSV
model_data = [
    {"model_name": "gpt-4-turbo", "status": "Available", "source": "OpenAI", "release_date": "2024-04-09", "parameters": "1.76T", "context_length": 128000, "cost_per_1k_tokens": 0.01},
    {"model_name": "claude-3-opus", "status": "Available", "source": "Anthropic", "release_date": "2024-02-29", "parameters": "Unknown", "context_length": 200000, "cost_per_1k_tokens": 0.015},
    {"model_name": "gemini-pro", "status": "Available", "source": "Google", "release_date": "2023-12-06", "parameters": "Unknown", "context_length": 32000, "cost_per_1k_tokens": 0.0005},
    {"model_name": "claude-3-sonnet", "status": "Available", "source": "Anthropic", "release_date": "2024-02-29", "parameters": "Unknown", "context_length": 200000, "cost_per_1k_tokens": 0.003},
    {"model_name": "gpt-3.5-turbo", "status": "Available", "source": "OpenAI", "release_date": "2022-11-30", "parameters": "175B", "context_length": 16385, "cost_per_1k_tokens": 0.0005},
    {"model_name": "llama-2-70b", "status": "Available", "source": "Meta", "release_date": "2023-07-18", "parameters": "70B", "context_length": 4096, "cost_per_1k_tokens": 0.0008},
    {"model_name": "mistral-large", "status": "Available", "source": "Mistral", "release_date": "2024-02-26", "parameters": "Unknown", "context_length": 32000, "cost_per_1k_tokens": 0.008},
    {"model_name": "claude-3-haiku", "status": "Available", "source": "Anthropic", "release_date": "2024-03-13", "parameters": "Unknown", "context_length": 200000, "cost_per_1k_tokens": 0.00025},
    {"model_name": "gpt-4", "status": "Available", "source": "OpenAI", "release_date": "2023-03-14", "parameters": "1.76T", "context_length": 8192, "cost_per_1k_tokens": 0.03},
    {"model_name": "gemini-ultra", "status": "Limited Access", "source": "Google", "release_date": "2023-12-06", "parameters": "Unknown", "context_length": 32000, "cost_per_1k_tokens": 0.002},
    {"model_name": "command-r-plus", "status": "Available", "source": "Cohere", "release_date": "2024-04-04", "parameters": "104B", "context_length": 128000, "cost_per_1k_tokens": 0.003},
    {"model_name": "mixtral-8x7b", "status": "Available", "source": "Mistral", "release_date": "2023-12-11", "parameters": "46.7B", "context_length": 32000, "cost_per_1k_tokens": 0.0007},
    {"model_name": "deepseek-coder-33b", "status": "Available", "source": "DeepSeek", "release_date": "2023-11-20", "parameters": "33B", "context_length": 16000, "cost_per_1k_tokens": 0.0014},
    {"model_name": "yi-34b-chat", "status": "Available", "source": "01.AI", "release_date": "2023-11-05", "parameters": "34B", "context_length": 4096, "cost_per_1k_tokens": 0.0006},
    {"model_name": "palm-2", "status": "Deprecated", "source": "Google", "release_date": "2023-05-10", "parameters": "540B", "context_length": 8000, "cost_per_1k_tokens": 0.001},
]

# Create DataFrame
df = pd.DataFrame(model_data)

# Create headers with underscores (as the user mentioned)
headers_data = {
    "model_name": "model_name",
    "status": "status", 
    "source": "source",
    "release_date": "release_date",
    "parameters": "parameters",
    "context_length": "context_length",
    "cost_per_1k_tokens": "cost_per_1k_tokens"
}

# Save the sample data files
df.to_csv('model_list.csv', index=False)
pd.DataFrame([headers_data]).to_csv('model_list_headers.csv', index=False)

# Create last updated file
with open('last-updated.txt', 'w') as f:
    f.write(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

print("Sample files created:")
print("- model_list.csv")
print("- model_list_headers.csv") 
print("- last-updated.txt")
print(f"\nSample data shape: {df.shape}")
print(f"Columns: {list(df.columns)}")
print(f"\nFirst few rows:")
print(df.head(3))