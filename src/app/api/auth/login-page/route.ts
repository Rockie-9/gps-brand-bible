import { NextResponse } from 'next/server';

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GPS Brand Bible — Authentication Required</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Lato', sans-serif;
      background: linear-gradient(135deg, #0D1B21 0%, #0A1A22 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #E2E8EC;
      -webkit-font-smoothing: antialiased;
    }
    .login-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 48px 40px;
      width: 100%;
      max-width: 400px;
      margin: 20px;
      backdrop-filter: blur(20px);
    }
    .logo-area {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo-mark {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      border-radius: 12px;
      background: linear-gradient(135deg, #26A7B0, #CAC3D2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-mark span {
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 4px;
    }
    .subtitle {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 0.06em;
    }
    .confidential {
      display: inline-block;
      margin-top: 12px;
      padding: 3px 10px;
      border-radius: 100px;
      background: rgba(217, 79, 79, 0.15);
      color: #D94F4F;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    label {
      display: block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
      margin-bottom: 6px;
    }
    input[type="password"] {
      width: 100%;
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.05);
      color: #fff;
      font-size: 14px;
      font-family: 'Lato', sans-serif;
      outline: none;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus {
      border-color: #26A7B0;
      box-shadow: 0 0 0 3px rgba(38, 167, 176, 0.15);
    }
    button {
      width: 100%;
      padding: 12px;
      margin-top: 16px;
      border: none;
      border-radius: 8px;
      background: linear-gradient(135deg, #26A7B0, #1E8A92);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.04em;
      transition: all 0.2s;
    }
    button:hover { opacity: 0.9; transform: translateY(-1px); }
    button:active { transform: translateY(0); }
    button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .error {
      margin-top: 12px;
      padding: 8px 12px;
      border-radius: 6px;
      background: rgba(217, 79, 79, 0.1);
      color: #D94F4F;
      font-size: 11px;
      display: none;
    }
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 9px;
      color: rgba(255,255,255,0.2);
      line-height: 1.6;
    }
    /* Prevent inspection */
    body { -webkit-user-select: none; user-select: none; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="logo-area">
      <div class="logo-mark"><span>GPS</span></div>
      <h1>Brand Bible</h1>
      <div class="subtitle">TSMC Global Physical Security</div>
      <div class="confidential">Confidential — Internal Use Only</div>
    </div>
    <form id="login-form">
      <label>Password / 密碼</label>
      <input type="password" id="password" placeholder="Enter access password" autocomplete="off" autofocus>
      <button type="submit" id="submit-btn">Authenticate / 驗證</button>
      <div class="error" id="error-msg"></div>
    </form>
    <div class="footer">
      &copy; TSMC Global Security Management<br>
      Unauthorized access is prohibited / 未經授權禁止存取
    </div>
  </div>
  <script>
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const errEl = document.getElementById('error-msg');
      const pw = document.getElementById('password').value;
      btn.disabled = true;
      btn.textContent = 'Verifying...';
      errEl.style.display = 'none';
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pw }),
        });
        if (res.ok) {
          window.location.href = '/';
        } else {
          const data = await res.json();
          errEl.textContent = data.error || 'Authentication failed';
          errEl.style.display = 'block';
        }
      } catch {
        errEl.textContent = 'Network error. Please try again.';
        errEl.style.display = 'block';
      }
      btn.disabled = false;
      btn.textContent = 'Authenticate / 驗證';
    });
    // Disable right-click on login page
    document.addEventListener('contextmenu', e => e.preventDefault());
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
