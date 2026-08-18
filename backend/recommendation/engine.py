"""
Recommendation Engine for Laptop Specification Matching & Ranking (INR - ₹)
Includes GPU Tier and TGP (Total Graphics Power Watts) evaluation.
"""

def calculate_match_score(laptop: dict, prefs: dict) -> tuple[float, list[str]]:
    """
    Calculates a suitability score (0-100%) and match reasons for a given laptop based on user preferences.
    """
    score = 100.0
    reasons = []
    specs = laptop["specs"]
    price = laptop["currentBestPrice"]
    
    # 1. Budget Fit
    budget = prefs.get("budget", 150000)
    if price <= budget:
        savings = budget - price
        if savings > 0:
            reasons.append(f"Fits within budget (Under by ₹{int(savings):,})")
        else:
            reasons.append("Fits exactly within target budget")
    else:
        over_budget = price - budget
        penalty = min(40.0, (over_budget / budget) * 50)
        score -= penalty
        reasons.append(f"Over target budget by ₹{int(over_budget):,}")
        
    # 2. GPU Power (TGP Watts) & GPU Tier Matching
    min_tgp = prefs.get("minGpuTgpWatts", 0)
    laptop_tgp = specs.get("tgpWatts", 30)
    gpu_tier = specs.get("gpuTier", "Integrated")
    preferred_gpu_tier = prefs.get("preferredGpuTier", "any")

    if preferred_gpu_tier != "any":
        if preferred_gpu_tier in gpu_tier or gpu_tier.startswith(preferred_gpu_tier):
            score += 10.0
            reasons.append(f"Matches preferred GPU tier ({specs['gpu']})")
        else:
            score -= 15.0

    if min_tgp > 0:
        if laptop_tgp >= min_tgp:
            score += 5.0
            reasons.append(f"High GPU Power: {laptop_tgp}W TGP meets your {min_tgp}W+ requirement")
        else:
            score -= 20.0
            reasons.append(f"GPU Power ({laptop_tgp}W TGP) below preferred {min_tgp}W limit")

    # 3. Use-Case Category Alignment
    target_usecase = prefs.get("useCase", "gaming")
    category = laptop["category"]
    
    if target_usecase == category:
        score += 5.0
        reasons.append(f"Tailored specifically for {target_usecase.capitalize()} workloads")
    elif target_usecase == "gaming" and (gpu_tier.startswith("Mid") or gpu_tier.startswith("High")):
        reasons.append(f"High-performance discrete GPU ({specs['gpu']} @ {laptop_tgp}W TGP)")
    elif target_usecase == "coding" and specs["ramGB"] >= 16:
        reasons.append(f"Generous {specs['ramGB']}GB RAM for IDE multi-tasking & compiling")
    elif target_usecase == "creator" and "OLED" in specs["resolution"]:
        reasons.append("Color-accurate OLED display ideal for photo/video editing")
    elif target_usecase == "student" and specs["batteryHours"] >= 10:
        reasons.append(f"Long {specs['batteryHours']}hr battery life for campus use")
        
    # 4. RAM Requirement
    min_ram = prefs.get("minRam", 16)
    laptop_ram = specs["ramGB"]
    if laptop_ram >= min_ram:
        if laptop_ram > min_ram:
            score += 5.0
            reasons.append(f"Exceeds minimum RAM ({laptop_ram}GB vs {min_ram}GB requested)")
        else:
            reasons.append(f"Meets requested {min_ram}GB RAM")
    else:
        score -= 25.0
        reasons.append(f"Has {laptop_ram}GB RAM (Less than {min_ram}GB preferred)")
        
    # 5. Storage Requirement
    min_storage = prefs.get("minStorage", 512)
    laptop_storage = specs["storageGB"]
    if laptop_storage >= min_storage:
        reasons.append(f"Storage: {laptop_storage}GB fast NVMe SSD")
    else:
        score -= 20.0
        reasons.append(f"Has {laptop_storage}GB SSD (Lower than {min_storage}GB target)")
        
    # 6. Discrete GPU Check
    needs_gpu = prefs.get("needsDedicatedGpu", False)
    if needs_gpu and gpu_tier == "Integrated":
        score -= 30.0
        reasons.append("Integrated graphics (Dedicated GPU recommended for heavy gaming/3D)")
    elif needs_gpu and gpu_tier != "Integrated":
        score += 5.0

    final_score = max(10.0, min(99.0, round(score, 1)))
    return final_score, reasons[:4]


def rank_laptops(laptops: list[dict], prefs: dict) -> list[dict]:
    """
    Ranks laptops based on suitability score for user preferences.
    """
    ranked = []
    for item in laptops:
        laptop = dict(item)
        score, reasons = calculate_match_score(laptop, prefs)
        laptop["matchScore"] = score
        laptop["matchReasons"] = reasons
        ranked.append(laptop)
        
    ranked.sort(key=lambda x: x["matchScore"], reverse=True)
    return ranked
