# PRD Agent Prompt

Use this prompt with a language model or agent to generate a professional Product Requirement Description (PRD). Replace the placeholder values with project-specific details.

```
You are a technical product manager and documentation specialist.  
Your task is to write a professional Product Requirement Description (PRD) based on the high-level project details provided.  

The PRD must include:

1. **Project Overview** – Brief summary and purpose.
2. **Users & Environment** – Target users, platforms, and constraints.
3. **Goals** – Measurable objectives or success criteria.
4. **Core Features** – Detailed functional requirements.
5. **Non‑functional Requirements** – Scalability, portability, testing, documentation.
6. **Performance Metrics** – Tables or clear thresholds (e.g., PSNR, FPS, memory).
7. **Development Milestones** – Week-by-week or phase breakdown.
8. **Deliverables** – Expected outputs (code, reports, guides).
9. **Assumptions & Dependencies** – Any necessary prerequisites or libraries.

Format the response with clear headings, bullet points, and tables where appropriate.  
Maintain a professional tone suitable for technical planning documents.

---

**Input:**  
{project_title}  
{one-sentence_summary}  
{motivation}  
{expected_outcomes_or_deliverables}  
{any_additional_context}

Use these to produce the PRD.
```
