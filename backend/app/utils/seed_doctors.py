from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import SessionLocal
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorCreate


@dataclass(frozen=True)
class SeedDoctorDefinition:
    full_name: str
    specialty: str
    bio: str
    credentials: str
    years_of_experience: int
    consultation_location: str
    availability_summary: str
    is_accepting_new_patients: bool = True
    is_active: bool = True


SEED_DOCTORS: tuple[SeedDoctorDefinition, ...] = (
    SeedDoctorDefinition(
        full_name="Dr Ahmed Hassan",
        specialty="Physiotherapy",
        bio="Senior physiotherapist focused on mobility restoration, posture correction, and everyday pain relief.",
        credentials="DPT, Manual Therapy Certified",
        years_of_experience=10,
        consultation_location="DoctorPhysio Clinic, Mogadishu",
        availability_summary="Mon-Fri, 8:00 AM - 5:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Amina Ali",
        specialty="Rehabilitation",
        bio="Rehabilitation specialist helping patients rebuild strength and movement after injury or prolonged inactivity.",
        credentials="MSc Rehabilitation Science",
        years_of_experience=8,
        consultation_location="DoctorPhysio Clinic, Mogadishu",
        availability_summary="Sat-Wed, 9:00 AM - 4:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Yusuf Abdi",
        specialty="Sports Injury",
        bio="Sports injury clinician supporting return-to-training plans for sprains, strains, and overuse recovery.",
        credentials="DPT, Sports Rehab Specialist",
        years_of_experience=9,
        consultation_location="DoctorPhysio Sports Wing, Mogadishu",
        availability_summary="Sun-Thu, 8:30 AM - 4:30 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Maryan Noor",
        specialty="Back Pain Treatment",
        bio="Back pain specialist focused on spinal mobility, ergonomic guidance, and long-term pain management.",
        credentials="DPT, Spine Care Practitioner",
        years_of_experience=11,
        consultation_location="DoctorPhysio Spine Center, Mogadishu",
        availability_summary="Mon-Thu, 10:00 AM - 6:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Mohamed Farah",
        specialty="Neurological Rehabilitation",
        bio="Neurological rehabilitation therapist supporting patients with balance, coordination, and functional independence goals.",
        credentials="MPT, Neuro Rehab Certified",
        years_of_experience=12,
        consultation_location="DoctorPhysio Neuro Unit, Mogadishu",
        availability_summary="Mon-Fri, 8:00 AM - 3:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Hani Ismail",
        specialty="Pediatric Physiotherapy",
        bio="Pediatric physiotherapist providing movement and developmental support for children and adolescents.",
        credentials="BSc PT, Pediatric Therapy Certified",
        years_of_experience=7,
        consultation_location="DoctorPhysio Family Care Wing, Mogadishu",
        availability_summary="Sat-Thu, 9:00 AM - 3:30 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Safiya Osman",
        specialty="Post-Surgery Rehabilitation",
        bio="Post-surgery rehabilitation provider guiding structured recovery after orthopedic and mobility-related procedures.",
        credentials="DPT, Post-Operative Recovery Specialist",
        years_of_experience=10,
        consultation_location="DoctorPhysio Recovery Suite, Mogadishu",
        availability_summary="Sun-Thu, 8:00 AM - 4:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Abdirahman Nur",
        specialty="Orthopedic Physiotherapy",
        bio="Orthopedic physiotherapist treating joint pain, muscle weakness, and movement limitations after injury.",
        credentials="MPT, Orthopedic Clinical Specialist",
        years_of_experience=13,
        consultation_location="DoctorPhysio Orthopedic Center, Mogadishu",
        availability_summary="Mon-Fri, 7:30 AM - 2:30 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Fadumo Ibrahim",
        specialty="Pain Management",
        bio="Pain management clinician using manual therapy and guided exercise to reduce chronic discomfort safely.",
        credentials="DPT, Pain Management Practitioner",
        years_of_experience=9,
        consultation_location="DoctorPhysio Wellness Clinic, Mogadishu",
        availability_summary="Mon-Thu, 11:00 AM - 6:30 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Abdulqadir Warsame",
        specialty="Mobility Recovery",
        bio="Mobility recovery therapist helping patients regain confidence, stability, and functional movement after setbacks.",
        credentials="BSc PT, Functional Movement Specialist",
        years_of_experience=6,
        consultation_location="DoctorPhysio Mobility Studio, Mogadishu",
        availability_summary="Sat-Wed, 8:30 AM - 4:30 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Nasteho Jama",
        specialty="Manual Therapy",
        bio="Manual therapy clinician focused on joint stiffness, soft tissue recovery, and restoring comfortable movement.",
        credentials="DPT, Manual Therapy Specialist",
        years_of_experience=8,
        consultation_location="DoctorPhysio Manual Care Unit, Mogadishu",
        availability_summary="Mon-Fri, 9:00 AM - 5:00 PM",
    ),
    SeedDoctorDefinition(
        full_name="Dr Bashir Suleiman",
        specialty="Geriatric Physiotherapy",
        bio="Geriatric physiotherapist helping older adults improve balance, mobility, and daily independence safely.",
        credentials="MPT, Geriatric Rehab Practitioner",
        years_of_experience=14,
        consultation_location="DoctorPhysio Senior Wellness Center, Mogadishu",
        availability_summary="Sun-Thu, 8:00 AM - 2:00 PM",
    ),
)


def ensure_development_environment() -> None:
    if settings.ENVIRONMENT != "development":
        raise RuntimeError(
            "Doctor seed script can run only when ENVIRONMENT=development."
        )


def _get_existing_doctor(
    db: Session,
    *,
    full_name: str,
    specialty: str,
) -> Doctor | None:
    statement = select(Doctor).where(
        Doctor.full_name == full_name,
        Doctor.specialty == specialty,
    )
    return db.scalar(statement)


def seed_doctors(db: Session) -> dict[str, object]:
    created_doctors: list[Doctor] = []
    skipped_count = 0

    for seed_doctor in SEED_DOCTORS:
        if _get_existing_doctor(
            db,
            full_name=seed_doctor.full_name,
            specialty=seed_doctor.specialty,
        ) is not None:
            skipped_count += 1
            continue

        payload = DoctorCreate(
            full_name=seed_doctor.full_name,
            specialty=seed_doctor.specialty,
            bio=seed_doctor.bio,
            credentials=seed_doctor.credentials,
            years_of_experience=seed_doctor.years_of_experience,
            consultation_location=seed_doctor.consultation_location,
            availability_summary=seed_doctor.availability_summary,
            is_accepting_new_patients=seed_doctor.is_accepting_new_patients,
            is_active=seed_doctor.is_active,
        )
        doctor = Doctor(**payload.model_dump())
        db.add(doctor)
        created_doctors.append(doctor)

    db.commit()

    for doctor in created_doctors:
        db.refresh(doctor)

    return {
        "created": len(created_doctors),
        "skipped": skipped_count,
        "created_doctors": created_doctors,
    }


def run() -> dict[str, object]:
    ensure_development_environment()

    with SessionLocal() as db:
        return seed_doctors(db)


if __name__ == "__main__":
    results = run()
    created_doctors: list[Doctor] = results["created_doctors"]  # type: ignore[assignment]
    print(f"Doctors created: {results['created']}")
    print(f"Doctors skipped: {results['skipped']}")
    for doctor in created_doctors:
        print(f"- {doctor.full_name} ({doctor.specialty})")
