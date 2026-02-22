import Swal, {
    type SweetAlertOptions,
    type SweetAlertResult,
} from "sweetalert2";

/* ───────────────────────────────────────────────
 * SVG icon builders (inlined so we don't depend on
 * any icon library – keeps bundle lean).
 * ─────────────────────────────────────────────── */

const icons = {
    checkCircle: `
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" stroke="url(#successGrad)" stroke-width="2.5" opacity="0.25"/>
      <circle cx="28" cy="28" r="20" fill="url(#successGrad)" opacity="0.1"/>
      <path d="M20 28.5L25.5 34L36 22" stroke="url(#successGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="successGrad" x1="0" y1="0" x2="56" y2="56">
          <stop stop-color="#34d399"/><stop offset="1" stop-color="#06b6d4"/>
        </linearGradient>
      </defs>
    </svg>`,

    xCircle: `
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" stroke="url(#errorGrad)" stroke-width="2.5" opacity="0.25"/>
      <circle cx="28" cy="28" r="20" fill="url(#errorGrad)" opacity="0.1"/>
      <path d="M22 22L34 34M34 22L22 34" stroke="url(#errorGrad)" stroke-width="3" stroke-linecap="round"/>
      <defs>
        <linearGradient id="errorGrad" x1="0" y1="0" x2="56" y2="56">
          <stop stop-color="#f87171"/><stop offset="1" stop-color="#ef4444"/>
        </linearGradient>
      </defs>
    </svg>`,

    alertTriangle: `
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" stroke="url(#warnGrad)" stroke-width="2.5" opacity="0.25"/>
      <circle cx="28" cy="28" r="20" fill="url(#warnGrad)" opacity="0.1"/>
      <path d="M28 21V30M28 34H28.01" stroke="url(#warnGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="warnGrad" x1="0" y1="0" x2="56" y2="56">
          <stop stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
    </svg>`,

    infoCircle: `
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="26" stroke="url(#infoGrad)" stroke-width="2.5" opacity="0.25"/>
      <circle cx="28" cy="28" r="20" fill="url(#infoGrad)" opacity="0.1"/>
      <path d="M28 24H28.01M28 28V35" stroke="url(#infoGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <defs>
        <linearGradient id="infoGrad" x1="0" y1="0" x2="56" y2="56">
          <stop stop-color="#60a5fa"/><stop offset="1" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
    </svg>`,
};

/* ───────────────────────────────────────────────
 * Shared base config — every variant inherits this.
 * ─────────────────────────────────────────────── */

const baseConfig: SweetAlertOptions = {
    background: "transparent",
    color: "#e2e8f0",
    showConfirmButton: true,
    showCancelButton: false,
    buttonsStyling: false,
    iconHtml: "",
    showClass: { popup: "swal-premium-show" },
    hideClass: { popup: "swal-premium-hide" },
    customClass: {
        popup: "swal-premium-popup",
        title: "swal-premium-title",
        htmlContainer: "swal-premium-html",
        confirmButton: "swal-premium-btn swal-premium-btn--confirm",
        cancelButton: "swal-premium-btn swal-premium-btn--cancel",
        icon: "swal-premium-icon-wrapper",
    },
};

/* ───────────────────────────────────────────────
 * HTML builder helper
 * ─────────────────────────────────────────────── */

type SwalVariant = "success" | "error" | "warning" | "info";

interface VariantTokens {
    accent: string;        // main accent for borders / highlights
    accentRgb: string;     // for rgba usage
    gradientFrom: string;
    gradientTo: string;
    icon: string;          // SVG markup
    btnLabel: string;
}

const variants: Record<SwalVariant, VariantTokens> = {
    success: {
        accent: "#34d399",
        accentRgb: "52,211,153",
        gradientFrom: "#34d399",
        gradientTo: "#06b6d4",
        icon: icons.checkCircle,
        btnLabel: "Aceptar",
    },
    error: {
        accent: "#f87171",
        accentRgb: "248,113,113",
        gradientFrom: "#f87171",
        gradientTo: "#ef4444",
        icon: icons.xCircle,
        btnLabel: "Cerrar",
    },
    warning: {
        accent: "#fbbf24",
        accentRgb: "251,191,36",
        gradientFrom: "#fbbf24",
        gradientTo: "#f59e0b",
        icon: icons.alertTriangle,
        btnLabel: "Entendido",
    },
    info: {
        accent: "#60a5fa",
        accentRgb: "96,165,250",
        gradientFrom: "#60a5fa",
        gradientTo: "#3b82f6",
        icon: icons.infoCircle,
        btnLabel: "Entendido",
    },
};

function buildHtml(variant: SwalVariant, title: string, message: string): string {
    const t = variants[variant];
    return `
    <div style="
      background: linear-gradient(145deg, rgba(15,23,42,0.97), rgba(15,23,42,0.92));
      border: 1px solid rgba(${t.accentRgb}, 0.15);
      border-radius: 1.5rem;
      padding: 2.5rem 2rem 2rem;
      backdrop-filter: blur(24px);
      box-shadow:
        0 0 60px rgba(${t.accentRgb}, 0.08),
        0 25px 50px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.04);
      position: relative;
      overflow: hidden;
    ">
      <!-- Subtle accent glow -->
      <div style="
        position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
        width: 200px; height: 120px;
        background: radial-gradient(ellipse, rgba(${t.accentRgb}, 0.15) 0%, transparent 70%);
        pointer-events: none;
      "></div>

      <!-- Icon -->
      <div style="
        display: flex; justify-content: center; margin-bottom: 1.5rem;
        position: relative; z-index: 1;
      ">
        <div style="
          width: 72px; height: 72px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(${t.accentRgb}, 0.06);
          border: 1px solid rgba(${t.accentRgb}, 0.1);
        ">
          ${t.icon}
        </div>
      </div>

      <!-- Title -->
      <h2 style="
        font-size: 1.25rem; font-weight: 700;
        color: #f1f5f9; text-align: center;
        margin: 0 0 0.625rem; letter-spacing: -0.01em;
        position: relative; z-index: 1;
      ">${title}</h2>

      <!-- Message -->
      <p style="
        font-size: 0.9rem; line-height: 1.6;
        color: #94a3b8; text-align: center;
        margin: 0 0 1.75rem;
        position: relative; z-index: 1;
      ">${message}</p>

      <!-- Button -->
      <div style="display: flex; justify-content: center; position: relative; z-index: 1;">
        <button id="swal-premium-confirm" style="
          cursor: pointer;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          border: none;
          font-weight: 600; font-size: 0.875rem;
          color: #0f172a;
          background: linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo});
          box-shadow:
            0 4px 15px rgba(${t.accentRgb}, 0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
        "
          onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(${t.accentRgb},0.4), inset 0 1px 0 rgba(255,255,255,0.2)'"
          onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(${t.accentRgb},0.3), inset 0 1px 0 rgba(255,255,255,0.2)'"
        >${t.btnLabel}</button>
      </div>
    </div>
  `;
}

/* ───────────────────────────────────────────────
 * Fire helper — wires up the custom button
 * ─────────────────────────────────────────────── */

function firePremium(
    variant: SwalVariant,
    title: string,
    message: string,
    options?: SweetAlertOptions,
): Promise<SweetAlertResult> {
    return Swal.fire({
        ...baseConfig,
        html: buildHtml(variant, title, message),
        icon: undefined,
        title: "",
        showConfirmButton: false,
        didOpen: (popup) => {
            const btn = popup.querySelector("#swal-premium-confirm") as HTMLButtonElement | null;
            if (btn) {
                btn.addEventListener("click", () => Swal.close());
            }
        },
        ...options,
    } as SweetAlertOptions);
}

/* ───────────────────────────────────────────────
 * Public API
 * ─────────────────────────────────────────────── */

export const SwalCustom = {
    success: (title: string, message: string, options?: SweetAlertOptions): Promise<SweetAlertResult> =>
        firePremium("success", title, message, options),

    error: (title: string, message: string, options?: SweetAlertOptions): Promise<SweetAlertResult> =>
        firePremium("error", title, message, options),

    warning: (title: string, message: string, options?: SweetAlertOptions): Promise<SweetAlertResult> =>
        firePremium("warning", title, message, options),

    info: (title: string, message: string, options?: SweetAlertOptions): Promise<SweetAlertResult> =>
        firePremium("info", title, message, options),

    /** Confirmation dialog with cancel button */
    confirm: (
        title: string,
        message: string,
        options?: SweetAlertOptions,
    ): Promise<SweetAlertResult> => {
        const t = variants.warning;
        return Swal.fire({
            ...baseConfig,
            html: `
        <div style="
          background: linear-gradient(145deg, rgba(15,23,42,0.97), rgba(15,23,42,0.92));
          border: 1px solid rgba(${t.accentRgb}, 0.15);
          border-radius: 1.5rem;
          padding: 2.5rem 2rem 2rem;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 60px rgba(${t.accentRgb}, 0.08),
            0 25px 50px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.04);
          position: relative; overflow: hidden;
        ">
          <div style="
            position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
            width: 200px; height: 120px;
            background: radial-gradient(ellipse, rgba(${t.accentRgb}, 0.15) 0%, transparent 70%);
            pointer-events: none;
          "></div>

          <div style="display: flex; justify-content: center; margin-bottom: 1.5rem; position: relative; z-index: 1;">
            <div style="
              width: 72px; height: 72px;
              display: flex; align-items: center; justify-content: center;
              border-radius: 50%;
              background: rgba(${t.accentRgb}, 0.06);
              border: 1px solid rgba(${t.accentRgb}, 0.1);
            ">${t.icon}</div>
          </div>

          <h2 style="font-size: 1.25rem; font-weight: 700; color: #f1f5f9; text-align: center; margin: 0 0 0.625rem; letter-spacing: -0.01em; position: relative; z-index: 1;">${title}</h2>
          <p style="font-size: 0.9rem; line-height: 1.6; color: #94a3b8; text-align: center; margin: 0 0 1.75rem; position: relative; z-index: 1;">${message}</p>

          <div style="display: flex; justify-content: center; gap: 0.75rem; position: relative; z-index: 1;">
            <button id="swal-premium-cancel" style="
              cursor: pointer; padding: 0.75rem 1.75rem; border-radius: 0.75rem;
              font-weight: 600; font-size: 0.875rem; color: #94a3b8;
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.08);
              transition: all 0.2s ease;
            "
              onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.color='#e2e8f0'"
              onmouseout="this.style.background='rgba(255,255,255,0.04)';this.style.color='#94a3b8'"
            >Cancelar</button>
            <button id="swal-premium-confirm" style="
              cursor: pointer; padding: 0.75rem 1.75rem; border-radius: 0.75rem;
              border: none; font-weight: 600; font-size: 0.875rem; color: #0f172a;
              background: linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo});
              box-shadow: 0 4px 15px rgba(${t.accentRgb}, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
              transition: all 0.2s ease;
            "
              onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(${t.accentRgb},0.4), inset 0 1px 0 rgba(255,255,255,0.2)'"
              onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(${t.accentRgb},0.3), inset 0 1px 0 rgba(255,255,255,0.2)'"
            >Confirmar</button>
          </div>
        </div>
      `,
            icon: undefined,
            title: "",
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: (popup) => {
                const confirmBtn = popup.querySelector("#swal-premium-confirm") as HTMLButtonElement | null;
                const cancelBtn = popup.querySelector("#swal-premium-cancel") as HTMLButtonElement | null;
                if (confirmBtn) {
                    confirmBtn.addEventListener("click", () => {
                        Swal.close({ isConfirmed: true, isDenied: false, isDismissed: false, value: true });
                    });
                }
                if (cancelBtn) {
                    cancelBtn.addEventListener("click", () => {
                        Swal.close({ isConfirmed: false, isDenied: false, isDismissed: true, value: undefined });
                    });
                }
            },
            ...options,
        } as SweetAlertOptions);
    },
};