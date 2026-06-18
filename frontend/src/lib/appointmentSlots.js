"use client";

const SLOT_HOURS = [10, 12, 14, 16, 18, 9];

function formatHour(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatWeekday(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
}

export function buildAppointmentSlots() {
  const now = new Date();

  return SLOT_HOURS.map((hour, index) => {
    const scheduledAt = new Date(now);
    scheduledAt.setDate(now.getDate() + index + 1);
    scheduledAt.setHours(hour, 0, 0, 0);

    return {
      id: scheduledAt.toISOString(),
      scheduledAt: scheduledAt.toISOString(),
      displayHour: formatHour(scheduledAt),
      weekday: formatWeekday(scheduledAt),
      dateLabel: scheduledAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });
}
