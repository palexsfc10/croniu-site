/**
 * Dados de demonstração — 100% fictícios, moldados pelos tipos reais de
 * apps/web/src/lib/api.ts. Nenhum dado de cliente real é usado.
 * A história: Marina Prado, personal, numa terça-feira de trabalho.
 */
const TODAY = "2026-09-15";
const at = (h, m = 0) => `${TODAY}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00-03:00`;

const CLIENTS = [
  { id: "c1", full_name: "Ana Ferreira" },
  { id: "c2", full_name: "Diego Farias" },
  { id: "c3", full_name: "Helena Duarte" },
  { id: "c4", full_name: "Rafael Nunes" },
  { id: "c5", full_name: "Camila Rocha" },
];

const appointment = (id, clientIdx, hour, minute, status = "scheduled") => ({
  id, client_id: CLIENTS[clientIdx].id, cycle_id: `cy${clientIdx + 1}`, service_id: "s1",
  location_id: "l1", title: null, starts_at: at(hour, minute), ends_at: at(hour + 1, minute),
  status, notes: null, created_at: at(8), updated_at: at(8),
  client_name: CLIENTS[clientIdx].full_name, service_name: "Acompanhamento individual",
  location_name: "Studio", cycle_service_name: "Acompanhamento individual",
});

const cycle = (id, clientIdx, endsOn, done, total) => ({
  id, client_id: CLIENTS[clientIdx].id, service_id: "s1", cycle_type: "lesson_pack",
  status: "active", starts_on: "2026-08-18", ends_on: endsOn, weekdays: [2, 4],
  lesson_count: total, lessons_completed: done, lessons_no_show: 0,
  lessons_remaining: total - done, pricing_mode: "fixed_period", value_cents: 48000,
  duration_label: "Mensal", notes: null, last_contacted_at: null, contact_confirmed_at: null,
  created_at: at(8), updated_at: at(8),
  client_name: CLIENTS[clientIdx].full_name, service_name: "Acompanhamento individual",
});

const receivable = (id, clientIdx, cents, dueOn, status = "pending") => ({
  id, cycle_id: `cy${clientIdx + 1}`, client_id: CLIENTS[clientIdx].id, amount_cents: cents,
  due_on: dueOn, status, paid_at: null, payment_method: null, notes: null,
  created_at: at(8), updated_at: at(8),
  client_name: CLIENTS[clientIdx].full_name, cycle_service_name: "Acompanhamento individual",
});

export function register(route) {
  route("GET", "/api/v1/auth/me", () => ({
    user: {
      id: "u1", email: "marina@studio.exemplo", full_name: "Marina Prado",
      created_at: "2026-01-10T12:00:00Z",
    },
    organization: {
      id: "o1", name: "Studio Marina Prado", timezone: "America/Sao_Paulo",
      profession_code: "personal_trainer", profession_onboarding_done: true,
    },
    role: "owner",
  }));

  // Formato real de BillingEntitlement (src/lib/billing.ts): o gate exige
  // has_active_access/can_write, senão redireciona para /app/trial-expired.
  route("GET", "/api/v1/billing/entitlement", () => ({
    subscription_status: "active",
    payment_status: "paid",
    has_active_access: true,
    can_write: true,
    can_read: true,
    billing_setup_status: "complete",
    plan_code: "pro_mensal",
    amount_cents: 2990,
    currency: "BRL",
  }));

  route("GET", "/api/v1/referrals/me", () => ({
    enabled: false, code: null, discount_percent: null, link: null,
  }));

  route("GET", "/api/v1/home/summary", () => ({
    organization_id: "o1",
    timezone: "America/Sao_Paulo",
    local_today: TODAY,
    today_appointments: [
      appointment("a1", 0, 9, 0),
      appointment("a2", 1, 11, 30),
      appointment("a3", 2, 16, 0),
      appointment("a4", 3, 18, 30),
    ],
    upcoming_appointments: [],
    in_progress_appointments: [],
    appointments_needing_outcome: [],
    cycles_nearing_end: [cycle("cy1", 0, "2026-09-18", 10, 12), cycle("cy2", 1, "2026-09-22", 9, 12)],
    cycles_ended_unrenewed: [],
    renewals: [cycle("cy1", 0, "2026-09-18", 10, 12)],
    pending_payments: [
      receivable("r1", 2, 48000, "2026-09-14", "overdue"),
      receivable("r2", 3, 36000, "2026-09-18"),
    ],
    renewal_requests: [],
    payment_reports_pending: [],
    attention_items: [
      {
        kind: "cycle_ending", title: "Ciclo de Ana Ferreira termina em 3 dias",
        subtitle: "10 de 12 sessões feitas · renovação em 18 set.",
        href: "/app/cycles/cy1", entity_id: "cy1", client_name: "Ana Ferreira",
        tone: "warning", priority_rank: 1,
      },
      {
        kind: "payment_overdue", title: "Recebimento de Helena Duarte venceu ontem",
        subtitle: "R$ 480,00 · Acompanhamento individual",
        href: "/app/receivables/r1", entity_id: "r1", client_name: "Helena Duarte",
        tone: "danger", priority_rank: 0,
      },
    ],
    priority_action: {
      kind: "cycle_renewal", title: "Renovar o ciclo da Ana Ferreira",
      subtitle: "Termina em 3 dias, com 10 de 12 sessões concluídas",
      href: "/app/cycles/cy1", entity_id: "cy1", cta_label: "Ver ciclo",
    },
    contextual_hint: "Quatro atendimentos hoje e um ciclo perto do fim.",
    // Sem palavra de saudação aqui: o cabeçalho acima já monta a saudação
    // (Bom dia/Boa tarde/Boa noite) a partir da hora real do navegador em
    // today-board.tsx (greetingForHour) — duplicar isso neste campo é o que
    // gerava "Boa noite, Marina" no título e "Bom dia, Marina" logo abaixo
    // quando a captura rodava à noite. capture.mjs também congela o relógio
    // do navegador para a hora escolhida abaixo, então essa saudação nunca
    // diverge do texto renderizado, não importa quando o script rodar.
    message: "Quatro atendimentos hoje e um ciclo perto de renovar.",
    routines_due_today_count: 2,
    has_active_service: true,
    has_active_cycle_template: true,
  }));

  // --- Endpoints secundários do painel "Hoje" -------------------------------
  // Formatos tirados de today-board.tsx (RoutineOccurrence, FinancialSummary,
  // RecentEvaluationRow). Sem eles a tela mostra "Não foi possível carregar".

  route("GET", "/api/v1/routines/board", () => ({
    today: TODAY,
    groups: [
      {
        items: [
          {
            id: "rt1", name: "Revisar anotações do cliente", type_label: "Rotina",
            client_name: "Rafael Nunes", client_id: "c4", overdue: true,
            due_on: "2026-09-14", occurrence_type: "notes_review",
          },
          {
            id: "rt2", name: "Enviar feedback da semana", type_label: "Rotina",
            client_name: "Camila Rocha", client_id: "c5", overdue: false,
            due_on: TODAY, occurrence_type: "feedback",
          },
        ],
      },
    ],
  }));

  route("GET", "/api/v1/receivables/overview", () => ({
    monthly_trend: [
      { month: "2026-06", received_cents: 356000 },
      { month: "2026-07", received_cents: 391000 },
      { month: "2026-08", received_cents: 447000 },
      { month: "2026-09", received_cents: 428000 },
    ],
    summary: {
      received_month_cents: 428000,
      forecast_month_cents: 512000,
      overdue_cents: 48000,
      overdue_count: 1,
      pending_count: 2,
    },
  }));

  route("GET", "/api/v1/receivables", () => [
    receivable("r3", 0, 48000, "2026-09-05", "paid"),
    receivable("r4", 1, 36000, "2026-09-08", "paid"),
  ]);

  route("GET", "/api/v1/evaluations/recent", () => []);
  route("GET", "/api/v1/accompaniment/pending", () => []);
  route("GET", "/api/v1/renewal-cases", () => []);
  route("GET", "/api/v1/clients", () =>
    CLIENTS.map((c) => ({
      id: c.id, full_name: c.full_name, phone: null, email: null, notes: null,
      status: "active", created_at: at(8), updated_at: at(8),
    })),
  );

  // --- Telas de Agenda, Ciclos e Assistente ---------------------------------

  route("GET", "/api/v1/agenda/next-appointments", () => ({
    c1: appointment("a1", 0, 9, 0),
    c2: appointment("a2", 1, 11, 30),
    c3: appointment("a3", 2, 16, 0),
    c4: appointment("a4", 3, 18, 30),
  }));

  route("GET", "/api/v1/appointments", () => [
    appointment("a1", 0, 9, 0),
    appointment("a2", 1, 11, 30),
    appointment("a3", 2, 16, 0),
    appointment("a4", 3, 18, 30),
  ]);

  route("GET", "/api/v1/cycles", () => [
    cycle("cy1", 0, "2026-09-18", 10, 12),
    cycle("cy2", 1, "2026-09-22", 9, 12),
    cycle("cy3", 2, "2026-10-06", 4, 12),
    cycle("cy4", 4, "2026-10-14", 2, 8),
  ]);

  route("GET", "/api/v1/cycles/:id", ([id]) => cycle(id, 0, "2026-09-18", 10, 12));

  route("GET", "/api/v1/organization/preferences", () => ({
    id: "o1", name: "Studio Marina Prado",
    timezone: "America/Sao_Paulo", local_today: TODAY,
  }));

  // DaySchedule real: starts_time/ends_time como strings "HH:MM" — o
  // componente faz .split() nelas, então campo ausente derruba a página.
  route("GET", "/api/v1/availability/settings", () => ({
    configured: true,
    days: [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({
      weekday,
      is_active: weekday >= 1 && weekday <= 5,
      starts_time: "07:00",
      ends_time: "20:00",
      break_starts_time: "12:00",
      break_ends_time: "13:00",
      default_duration_minutes: 60,
    })),
  }));

  route("GET", "/api/v1/intake-submissions", () => []);
  route("GET", "/api/v1/agent/status", () => ({ enabled: true, model_ready: true }));
  route("GET", "/api/v1/agent/threads", () => []);

  route("GET", "/api/v1/agenda/day", (_m, url) => ({
    date: url.searchParams.get("day") || TODAY,
    timezone: "America/Sao_Paulo",
    appointments: [
      appointment("a1", 0, 9, 0), appointment("a2", 1, 11, 30),
      appointment("a3", 2, 16, 0), appointment("a4", 3, 18, 30),
    ],
    conflict_count: 0,
  }));

  route("GET", "/api/v1/agenda/range", () => ({
    timezone: "America/Sao_Paulo",
    days: [
      { date: "2026-09-14", timezone: "America/Sao_Paulo", conflict_count: 0,
        appointments: [appointment("b1", 4, 8, 0), appointment("b2", 0, 15, 0)] },
      { date: TODAY, timezone: "America/Sao_Paulo", conflict_count: 0,
        appointments: [appointment("a1", 0, 9, 0), appointment("a2", 1, 11, 30),
                       appointment("a3", 2, 16, 0), appointment("a4", 3, 18, 30)] },
      { date: "2026-09-17", timezone: "America/Sao_Paulo", conflict_count: 0,
        appointments: [appointment("b3", 2, 10, 0), appointment("b4", 3, 19, 0)] },
      { date: "2026-09-18", timezone: "America/Sao_Paulo", conflict_count: 0,
        appointments: [appointment("b5", 0, 9, 0)] },
    ],
  }));

  route("GET", "/api/v1/availability/day", (_m, url) => {
    const day = url.searchParams.get("day") || TODAY;
    // AvailabilitySlot real: starts_at/ends_at ISO + label.
    const slot = (h) => ({
      starts_at: `${day}T${String(h).padStart(2, "0")}:00:00-03:00`,
      ends_at: `${day}T${String(h + 1).padStart(2, "0")}:00:00-03:00`,
      label: `${String(h).padStart(2, "0")}:00`,
    });
    return {
      date: day, weekday: 3, timezone: "America/Sao_Paulo", configured: true,
      is_active: true, duration_minutes: 60,
      slots: [slot(7), slot(8), slot(10), slot(14), slot(15), slot(17), slot(19)],
    };
  });
}
