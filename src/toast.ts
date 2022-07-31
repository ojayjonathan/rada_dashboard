type Options = {
  type?: "success" | "danger" | "info" | "primary" | "warning";
  customButtons?: {
    label: string;
    onClick: () => void;
    color?: string;
    backgroundColor?: string;
  }[];
  top?: boolean;
  /**
   * duration in milliseconds
   */
  duration?: number;
};

type ToastProps = {
  options?: Options;
  message?: string;
};
type BtnProps = {
  className?: string;
  label: string;
  onClick: () => void;
  style?: { color?: string; backgroundColor?: string };
};
export class Toast {
  toast: HTMLElement;
  toastContainer: HTMLElement;
  toastCloseBtn: HTMLElement;
  toastParagraph: HTMLElement;

  private defaultOptions: Options;
  constructor(options: Options = {}) {
    this.close.bind(this);
    this.defaultOptions = {
      type: "info",
      top: false,
      ...options,
      customButtons: [],
    };
    this.toast = document.createElement("div");
    this.toastContainer = document.createElement("div");
    this.toastCloseBtn = this.createBtn({
      label: "close",
      onClick: () => this.close(),
      style: { color: "currentColor" },
      className: "toast-btn-close",
    });
    this.toastCloseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" fill="currentColor" height="32" width="32">
    <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>`;
    this.toastParagraph = document.createElement("p");
    this.toastContainer.classList.add("t-toast-container");
    if (options.top) {
      this.toastContainer.classList.add("t-toast-top");
    }

    this.toast.classList.add("t-toast");

    document.body.appendChild(this.toastContainer);
    this.toastContainer.appendChild(this.toast);
    this.toast.appendChild(this.toastParagraph);
    this.toast.appendChild(this.toastCloseBtn);
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  }
  error({ message, options = {} }: ToastProps) {
    options.type = "danger";
    this.render({ message, options });
  }
  success({ message, options = {} }: ToastProps) {
    options.type = "success";
    this.render({ message: message, options: options });
  }
  primary({ message, options = {} }: ToastProps) {
    options.type = "primary";
    this.render({ message: message, options: options });
  }
  warning({ message, options = {} }: ToastProps) {
    options.type = "warning";
    this.render({ message: message, options: options });
  }
  info({ message, options = {} }: ToastProps) {
    options.type = "info";
    this.render({ message: message, options: options });
  }
  private close() {
    this.toastContainer.setAttribute("arial-hidden", "true");

    this.toastContainer.classList.remove("t-toast-display");
  }
  private createBtn({ label, onClick, className = "", style = {} }: BtnProps) {
    const btn = document.createElement("button");
    btn.classList.add(`t-toast-btn`);
    className && btn.classList.add(className);
    style.backgroundColor &&
      (btn.style.backgroundColor = style.backgroundColor);
    style.color && (btn.style.color = style.color);

    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }
  private render({ message, options }: ToastProps) {
    options = { ...this.defaultOptions, ...options };
    this.toastParagraph.textContent = message ?? "";
    const buttons = this.toast.querySelectorAll("button");
    buttons.forEach((btn) => {
      if (btn != this.toastCloseBtn) {
        this.toast.removeChild(btn);
      }
    });
    for (let p of options.customButtons ?? []) {
      this.toast.appendChild(
        this.createBtn({
          label: p.label,
          onClick: p.onClick,
          className: "t-toast-custom-btn",
          style: {
            color: p.color,
            backgroundColor: p.backgroundColor,
          },
        })
      );
    }
    this.toast.classList.value = `t-toast t-toast-${options.type}`;
    this.toastContainer.classList.add("t-toast-display");
    this.toastContainer.setAttribute("arial-hidden", "false");
    options.duration && setTimeout(() => this.close(), options.duration);
  }
}

const css = `
  .t-toast-container {
    position: absolute;
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: calc(100% - 60px);
    max-width: 400px;
    transform: translateX(-150%);
    transition: transform 1s;
    pointer-events: none;
    z-index:9999;
  }

  .t-toast {
    pointer-events: all;
    padding: 1rem;
    border-radius: 4px;
  }

  .t-toast-display {
    transform: translateX(0);
  }

  .t-toast-top {
    top: 30px !important;
  }
  .t-toast-bottom {
    bottom: 30px;
  }

  .t-toast-btn {
    padding: 5px 10px;
    border: 0;
    border-radius: 4px;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background:transparent;
  }
  .t-toast-custom-btn {
    background: #323232;
    color: #fff;
  }
  .t-toast-primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
  }
  .t-toast-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  .t-toast-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  .t-toast-info {
    color: #0c5460;
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }
  .t-toast-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }
  .toast-btn-close {
    position: fixed;
    top: 0;
    right: 0;
    color: currentColor;
    margin:0;
    padding:0;
    padding-left:5px;
  }
  `;
export default new Toast();
