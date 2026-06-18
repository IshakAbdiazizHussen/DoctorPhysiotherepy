from app.schemas.appointment import (
    AppointmentAdminRead,
    AppointmentCreate,
    AppointmentRead,
    AppointmentStatusUpdate,
)
from app.schemas.doctor import DoctorAdminRead, DoctorCreate, DoctorRead, DoctorUpdate
from app.schemas.patient import (
    PatientAdminRead,
    PatientAdminUpdate,
    PatientCreate,
    PatientRead,
    PatientSelfUpdate,
)
from app.schemas.service import (
    ServiceAdminRead,
    ServiceCreate,
    ServiceRead,
    ServiceUpdate,
)
from app.schemas.user import (
    Token,
    TokenPayload,
    UserCreate,
    UserLogin,
    UserRead,
    UserUpdate,
)

__all__ = [
    "DoctorCreate",
    "DoctorUpdate",
    "DoctorRead",
    "DoctorAdminRead",
    "AppointmentCreate",
    "AppointmentStatusUpdate",
    "AppointmentRead",
    "AppointmentAdminRead",
    "PatientCreate",
    "PatientRead",
    "PatientAdminRead",
    "PatientSelfUpdate",
    "PatientAdminUpdate",
    "ServiceCreate",
    "ServiceUpdate",
    "ServiceRead",
    "ServiceAdminRead",
    "UserCreate",
    "UserLogin",
    "UserRead",
    "UserUpdate",
    "Token",
    "TokenPayload",
]
