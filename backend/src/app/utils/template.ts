const otp = `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding: 40px 0">
  <tr>
    <td align="center">
      <!-- Card -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          max-width: 520px;
          background-color: #f6f7fb;
          border-radius: 14px;
          padding: 40px 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen,
            Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Arial, sans-serif;
        "
      >
        <!-- Logo -->
        <tr>
          <td align="center" style="padding-bottom: 24px">
            <img
              style="width: 50px; height: 50px"
              src="https://res.cloudinary.com/dqgynvtyz/image/upload/v1765617577/logo_ilpvil.png"
            />
            <div style="margin-top: 10px; font-size: 22px; font-weight: 600; color: #111827">
              Docvia
            </div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td
            align="center"
            style="font-size: 22px; font-weight: 600; color: #111827; padding-bottom: 12px"
          >
            Verify your Docvia sign-up
          </td>
        </tr>

        <!-- Description -->
        <tr>
          <td
            align="center"
            style="font-size: 14px; color: #4b5563; line-height: 1.6; padding-bottom: 28px"
          >
            We have received a sign-up attempt with the following code. Please enter it in the
            browser window where you started signing up for Docvia.
          </td>
        </tr>

        <!-- Code Box -->
        <tr>
          <td align="center" style="padding-bottom: 24px">
            <div
              style="
                background-color: #f1f5f9;
                border-radius: 10px;
                padding: 22px 0;
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 6px;
                color: #111827;
              "
            >
              {{otp_code}}
            </div>
          </td>
        </tr>

        <!-- Footer Note -->
        <tr>
          <td
            align="center"
            style="font-size: 13px; color: #6b7280; line-height: 1.6; padding-bottom: 32px"
          >
            If you did not attempt to sign up but received this email, please disregard it. The code
            will remain active for
            <strong>5 minutes</strong>.
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding: 20px 0">
            <div style="height: 1px; background-color: #e5e7eb; width: 100%"></div>
          </td>
        </tr>

        <!-- Bottom Text -->
        <tr>
          <td align="center" style="font-size: 13px; color: #6b7280; padding-bottom: 12px">
            Docvia, an effortless identity solution with all the features you need.
          </td>
        </tr>

        <!-- Copyright -->
        <tr>
          <td align="center" style="font-size: 12px; color: #9ca3af">
            © 2025 Docvia. All rights reserved.
          </td>
        </tr>
      </table>
      <!-- End Card -->
    </td>
  </tr>
</table>
`;

const forgot_password = `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding: 40px 0">
  <tr>
    <td align="center">
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          max-width: 520px;
          background-color: #f6f7fb;
          border-radius: 14px;
          padding: 40px 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen,
            Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Arial, sans-serif;
        "
      >
        <!-- Logo -->
        <tr>
          <td align="center" style="padding-bottom: 24px">
            <img
              style="width: 50px; height: 50px"
              src="https://res.cloudinary.com/dqgynvtyz/image/upload/v1765617577/logo_ilpvil.png"
            />
            <div style="margin-top: 10px; font-size: 22px; font-weight: 600; color: #111827">
              Docvia
            </div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td
            align="center"
            style="font-size: 22px; font-weight: 600; color: #111827; padding-bottom: 12px"
          >
            Reset your password
          </td>
        </tr>

        <!-- Text -->
        <tr>
          <td
            align="center"
            style="font-size: 14px; color: #4b5563; line-height: 1.6; padding-bottom: 28px"
          >
            We received a request to reset your password. Click the button below to create a new
            password for your account.
          </td>
        </tr>

        <!-- Button -->
        <tr>
          <td align="center" style="padding-bottom: 28px">
            <a
              href="{{reset_url}}"
              style="
                display: inline-block;
                background: linear-gradient(135deg, #8b5cf6, #a855f7);
                color: #ffffff;
                text-decoration: none;
                font-size: 15px;
                font-weight: 600;
                padding: 14px 28px;
                border-radius: 10px;
              "
            >
              Reset Password
            </a>
          </td>
        </tr>

        <!-- Expiry -->
        <tr>
          <td
            align="center"
            style="font-size: 13px; color: #6b7280; line-height: 1.6; padding-bottom: 32px"
          >
            This link will expire in <strong>5 minutes</strong>. If you did not request a password
            reset, you can safely ignore this email.
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding: 20px 0">
            <div style="height: 1px; background-color: #e5e7eb"></div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="font-size: 13px; color: #6b7280; padding-bottom: 10px">
            Docvia, an effortless identity solution with all the features you need.
          </td>
        </tr>
        <tr>
          <td align="center" style="font-size: 12px; color: #9ca3af">
            © 2025 Docvia. All rights reserved.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

const password_changed = `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="padding: 40px 0">
  <tr>
    <td align="center">
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          max-width: 520px;
          background-color: #f6f7fb;
          border-radius: 14px;
          padding: 40px 32px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen,
            Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, Arial, sans-serif;
        "
      >
        <!-- Logo -->
        <tr>
          <td align="center" style="padding-bottom: 24px">
            <img
              style="width: 50px; height: 50px"
              src="https://res.cloudinary.com/dqgynvtyz/image/upload/v1765617577/logo_ilpvil.png"
            />
            <div style="margin-top: 10px; font-size: 22px; font-weight: 600; color: #111827">
              Docvia
            </div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td
            align="center"
            style="font-size: 22px; font-weight: 600; color: #111827; padding-bottom: 12px"
          >
            Your password has been changed
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td
            align="center"
            style="font-size: 14px; color: #4b5563; line-height: 1.6; padding-bottom: 28px"
          >
            This is a confirmation that the password for your Docvia account was changed
            successfully.
          </td>
        </tr>

        <!-- Alert Box -->
        <tr>
          <td align="center" style="padding-bottom: 28px">
            <div
              style="
                background-color: #f1f5f9;
                border-radius: 10px;
                padding: 16px;
                font-size: 14px;
                color: #111827;
                line-height: 1.6;
              "
            >
              If you did not make this change, please reset your password immediately or contact
              support.
            </div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding: 20px 0">
            <div style="height: 1px; background-color: #e5e7eb"></div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="font-size: 13px; color: #6b7280; padding-bottom: 10px">
            Docvia, an effortless identity solution with all the features you need.
          </td>
        </tr>
        <tr>
          <td align="center" style="font-size: 12px; color: #9ca3af">
            © 2025 Docvia. All rights reserved.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

const templates = {
  otp,
  forgot_password,
  password_changed,
};

export default templates;
