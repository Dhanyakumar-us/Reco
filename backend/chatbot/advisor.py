"""
AI Laptop Advisor Chatbot Service (INR Prices)
Provides technical explanations, laptop comparison analysis, and hardware guidance.
"""

def generate_chatbot_response(user_text: str, laptop_id: str | None = None, laptops_db: list[dict] = []) -> dict:
    """
    Generates intelligent response to user questions about laptops and hardware.
    """
    query = user_text.lower().strip()
    
    # 1. Spec Explanations (RAM, Storage, GPU, CPU)
    if "ram" in query:
        text = (
            "**RAM (Random Access Memory)** determines how many applications your laptop can handle simultaneously without slowing down.\n\n"
            "- **8GB RAM**: Suitable for basic web browsing, documents, and streaming.\n"
            "- **16GB RAM (Recommended)**: Ideal for multi-tasking, coding IDEs, gaming, and 4K video editing.\n"
            "- **32GB+ RAM**: Best for heavy 3D rendering, virtual machines, massive datasets, and future-proof gaming."
        )
        quick_replies = ["How much RAM for gaming?", "Should I pick 16GB or 32GB?", "Is RAM upgradable?"]
    elif "storage" in query or "ssd" in query:
        text = (
            "**Storage (SSD vs HDD)** affects file load times, system boot speed, and game loading.\n\n"
            "- **512GB SSD**: Good for everyday work, documents, and 3-5 modern AAA games.\n"
            "- **1TB (1024GB) SSD**: Recommended standard for gamers, developers, and creators.\n"
            "- **2TB+ SSD**: Great for storing large video project files, media libraries, and huge game catalogs."
        )
        quick_replies = ["What is NVMe Gen 4?", "Can I upgrade SSD later?"]
    elif "gpu" in query or "graphics" in query or "rtx" in query:
        text = (
            "**GPU (Graphics Processing Unit)** handles visual rendering, 3D graphics, AI tasks, and gaming framerates.\n\n"
            "- **Integrated (Intel Arc / Apple M-series)**: High battery efficiency; great for productivity & light editing.\n"
            "- **Entry (RTX 4050)**: Plays modern games at 1080p medium-high settings.\n"
            "- **Mid-Range (RTX 4060 / 4070)**: Sweet spot for 1440p gaming, VR, and fast video rendering.\n"
            "- **High-End (RTX 4080 / 4090)**: Maximum performance, ray tracing, 4K gaming, and AI local model training."
        )
        quick_replies = ["RTX 4060 vs 4070 difference?", "Do I need a discrete GPU for coding?"]
    elif "cpu" in query or "processor" in query or "intel" in query or "ryzen" in query or "apple m3" in query:
        text = (
            "**CPU (Processor)** is the brain of your computer handling logic, math, and background processes.\n\n"
            "- **Apple M3 / M3 Pro**: Industry-leading power efficiency, cool thermals, and long battery life (18+ hrs).\n"
            "- **Intel Core Ultra (H-series)**: Built-in NPU for AI acceleration with Arc graphics.\n"
            "- **Intel Core i7/i9 HX & AMD Ryzen 7/9**: High wattage multi-core powerhouses built for raw performance."
        )
        quick_replies = ["Intel vs AMD for laptops?", "What is an NPU?"]
    elif "compare" in query or "versus" in query or "vs" in query:
        text = (
            "You can compare any laptops side-by-side using our **Comparison Matrix**!\n\n"
            "Simply click the **'+ Compare'** button on any laptop card to view specs, price histories in ₹, display resolution, weight, and battery life side-by-side."
        )
        quick_replies = ["Show top gaming laptops", "Compare MacBook Pro vs Zephyrus G16"]
    elif "price" in query or "discount" in query or "deal" in query or "wait" in query or "festive" in query:
        text = (
            "Our **Price Prediction Engine** monitors historical trends on Amazon India, Flipkart, and retailer stock.\n\n"
            "Look for the **'HISTORICAL LOW'** or **'BUY NOW'** badges on laptop cards for verified discounts in Rupees (₹), or check the **Market Trends** tab for upcoming sale dates!"
        )
        quick_replies = ["When is the next sale?", "Show best deals under ₹1,00,000"]
    else:
        text = (
            "Namaste! I am your **AI Laptop Advisor**.\n\n"
            "- Explaining hardware specs in detail (RAM, GPU, CPU, SSD, Displays)\n"
            "- Recommending laptops in Indian Rupees (₹) for Gaming, Coding, Editing, or College\n"
            "- Checking price forecasts & festival sale deals\n"
            "- Comparing laptop models side-by-side\n\n"
            "What laptop or hardware question can I help you with today?"
        )
        quick_replies = ["Best gaming laptop under ₹1,20,000", "MacBook Air vs Pro under ₹1,50,000", "How much RAM do I need?"]
        
    return {
        "sender": "bot",
        "text": text,
        "quickReplies": quick_replies
    }
