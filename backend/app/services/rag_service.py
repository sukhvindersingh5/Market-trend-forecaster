from app.database import raw_data_collection
from app.services.llm_service import ask_llm


async def rag_chat(question):

    # get data from MongoDB
    cursor = raw_data_collection.find({})
    products = await cursor.to_list(length=50)

    context = ""

    for p in products:
        context += f"""
Product: {p.get('product_name')}
Rating: {p.get('rating')}
Sentiment: {p.get('sentiment')}
Review: {p.get('review')}
"""

    prompt = f"""
You are an AI Market Intelligence Assistant.

Use the product data below to answer the user's question.

Product Data:
{context}

User Question:
{question}

Give analytical answer about:
- product reviews
- ratings
- customer sentiment
- market trends
"""

    return ask_llm(prompt)