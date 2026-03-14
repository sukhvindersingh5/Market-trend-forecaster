import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are an AI Market Intelligence Assistant for consumer electronics and smart home devices.

You specialize in analyzing products such as:
• smart speakers
• headphones
• smartphones
• laptops
• IoT devices
• consumer technology products

IMPORTANT RULES:
1. Do NOT invent unrelated product categories.
2. If the product belongs to consumer electronics (like Echo, Nest Mini, HomePod), analyze them as smart home devices.
3. Never assume products belong to cannabis, vape, or unrelated industries unless the user clearly specifies.
4. Focus on market positioning, ecosystem compatibility, and user experience.

Always respond in this format:

## Product Overview
Short explanation of the products.

## Key Comparison
Explain major differences in ecosystem, AI assistant, and usability.

## Market Position
Explain which brand leads in the smart speaker market.

## Consumer Insights
Explain what customers generally prefer.

## Recommendation
Suggest which product is best for different users.
"""


async def ask_ai(question):

    try:

        response = client.chat.completions.create(

            model="llama-3.1-8b-instant",

            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question}
            ],

            temperature=0.5,
            max_tokens=700
        )

        return response.choices[0].message.content

    except Exception as e:

        print("AI ERROR:", e)

        return "AI service temporarily unavailable."