import io
from typing import Dict, Any, List
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_pdf_resume(resume_data: Dict[str, Any]) -> io.BytesIO:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#1e3a8a")
    text_color = colors.HexColor("#1f2937")
    subtext_color = colors.HexColor("#4b5563")

    name_style = ParagraphStyle(
        'ResumeName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        alignment=TA_CENTER,
        textColor=primary_color
    )

    title_style = ParagraphStyle(
        'ResumeTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        alignment=TA_CENTER,
        textColor=subtext_color
    )

    contact_style = ParagraphStyle(
        'ResumeContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=subtext_color
    )

    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceAfter=4,
        spaceBefore=10
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=text_color
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        alignment=TA_RIGHT,
        textColor=subtext_color
    )

    body_style = ParagraphStyle(
        'ResumeBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color
    )

    bullet_style = ParagraphStyle(
        'ResumeBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )

    story = []

    personal = resume_data.get("personalInfo", {})
    first_name = personal.get("firstName", "")
    last_name = personal.get("lastName", "")
    full_name = f"{first_name} {last_name}".strip() or "Candidate Resume"
    job_title = personal.get("jobTitle") or personal.get("title") or ""
    
    story.append(Paragraph(full_name.upper(), name_style))
    if job_title:
        story.append(Spacer(1, 2))
        story.append(Paragraph(job_title, title_style))

    contact_parts = []
    if personal.get("email"): contact_parts.append(personal["email"])
    if personal.get("phone"): contact_parts.append(personal["phone"])
    if personal.get("location"): contact_parts.append(personal["location"])
    if personal.get("portfolio"): contact_parts.append(personal["portfolio"])

    if contact_parts:
        story.append(Spacer(1, 4))
        story.append(Paragraph(" • ".join(contact_parts), contact_style))

    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=8, spaceBefore=4))

    summary = personal.get("summary", "").strip()
    if summary:
        story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=6, spaceBefore=1))
        story.append(Paragraph(summary, body_style))
        story.append(Spacer(1, 6))

    skills = resume_data.get("skills", [])
    if skills:
        story.append(Paragraph("CORE COMPETENCIES & TECHNICAL SKILLS", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=6, spaceBefore=1))
        skills_text = "  •  ".join(skills)
        story.append(Paragraph(skills_text, body_style))
        story.append(Spacer(1, 6))

    experience = resume_data.get("experience", [])
    if experience:
        story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=6, spaceBefore=1))

        for job in experience:
            role = job.get("role", "Job Title")
            company = job.get("company", "Company")
            start = job.get("startDate", "")
            end = job.get("endDate", "Present")
            date_range = f"{start} — {end}" if start else end

            table_data = [
                [
                    Paragraph(f"<b>{role}</b> | <font color='#1e3a8a'>{company}</font>", job_title_style),
                    Paragraph(date_range, date_style)
                ]
            ]
            t = Table(table_data, colWidths=[380, 160])
            t.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
                ('BOTTOMPADDING', (0,0), (-1,-1), 1),
                ('TOPPADDING', (0,0), (-1,-1), 0),
                ('LEFTPADDING', (0,0), (-1,-1), 0),
                ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ]))
            story.append(t)
            story.append(Spacer(1, 3))

            desc = job.get("description", "")
            if desc:
                lines = [l.strip() for l in desc.split("\n") if l.strip()]
                for line in lines:
                    clean_line = line.lstrip("•-* ").strip()
                    story.append(Paragraph(f"&bull; {clean_line}", bullet_style))

            story.append(Spacer(1, 6))

    projects = resume_data.get("projects", [])
    if projects:
        story.append(Paragraph("PROJECTS", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=6, spaceBefore=1))

        for proj in projects:
            title = proj.get("title", "Project")
            link = proj.get("link", "")
            header_text = f"<b>{title}</b>"
            if link:
                header_text += f" ({link})"
            story.append(Paragraph(header_text, job_title_style))
            story.append(Spacer(1, 2))

            desc = proj.get("description", "")
            if desc:
                story.append(Paragraph(desc, body_style))
            story.append(Spacer(1, 6))

    education = resume_data.get("education", [])
    if education:
        story.append(Paragraph("EDUCATION", section_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=6, spaceBefore=1))

        for edu in education:
            school = edu.get("school", "University")
            degree = edu.get("degree", "Degree")
            start = edu.get("startDate", "")
            end = edu.get("endDate", "")
            date_range = f"{start} — {end}" if start and end else (start or end)

            table_data = [
                [
                    Paragraph(f"<b>{school}</b> — {degree}", job_title_style),
                    Paragraph(date_range, date_style)
                ]
            ]
            t = Table(table_data, colWidths=[400, 140])
            t.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'TOP'),
                ('BOTTOMPADDING', (0,0), (-1,-1), 2),
                ('TOPPADDING', (0,0), (-1,-1), 0),
                ('LEFTPADDING', (0,0), (-1,-1), 0),
                ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ]))
            story.append(t)
            desc = edu.get("description", "")
            if desc:
                story.append(Paragraph(desc, body_style))
            story.append(Spacer(1, 4))

    doc.build(story)
    buffer.seek(0)
    return buffer
