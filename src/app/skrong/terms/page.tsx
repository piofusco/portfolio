import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skrong — Terms and Conditions",
};

export default function SkrongTermsAndConditions() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Terms and Conditions</h1>
        <p className="mt-1 text-muted">Skrong — Effective Date: November 16, 2026</p>
      </header>

      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Skrong mobile application
        (&ldquo;App&rdquo;), formerly known as Secnds, operated by Americo LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;), a Colorado limited liability company.
      </p>
      <p>
        By downloading, installing, or using Skrong, you agree to be bound by these Terms. If you do not agree, do not
        use the App.
      </p>

      <h2>2. Use of the App</h2>

      <h3>Eligibility</h3>
      <p>
        Skrong is designed for users of all ages. If you are under 13, we encourage you to review these Terms with a
        parent or guardian before using the App. Because Skrong does not collect personal information from any user,
        no parental consent is required for use.
      </p>

      <h3>License</h3>
      <p>
        We grant you a limited, non-exclusive, non-transferable, revocable license to use Skrong for your personal,
        non-commercial purposes, subject to these Terms.
      </p>

      <h3>Prohibited Conduct</h3>
      <p>You agree not to:</p>
      <ul>
        <li>Reverse engineer, decompile, or disassemble any part of the App</li>
        <li>Use the App for any unlawful purpose</li>
        <li>Attempt to gain unauthorized access to any part of the App or its related systems</li>
        <li>Sell, sublicense, or otherwise transfer your rights to use the App</li>
      </ul>

      <h2>3. In-App Purchases</h2>
      <p>
        Skrong offers an optional in-app purchase, Skrong Unlimited, that unlocks unlimited workouts and timers and
        the ability to organize them in folders (&ldquo;Premium Feature&rdquo;). The Premium Feature is a one-time
        purchase processed through the Apple App Store.
      </p>

      <h3>Payments</h3>
      <p>
        All purchases are processed by Apple. Americo LLC does not collect or store payment information. By completing
        a purchase, you also agree to Apple&rsquo;s App Store Terms of Service.
      </p>

      <h3>Refunds</h3>
      <p>
        All purchases are final. Refund requests are handled by Apple in accordance with their refund policy. We do not
        issue refunds directly.
      </p>

      <h3>Restore Purchases</h3>
      <p>
        If you reinstall the App or switch devices, you may restore your purchase using the Restore Purchases option
        within the App, provided you are signed in with the same Apple Account used for the original purchase.
        Purchases made under the name Secnds carry over to Skrong.
      </p>

      <h2>4. Apple Health (HealthKit)</h2>
      <p>
        With your permission, Skrong may read data from and write data to Apple HealthKit, including workouts, energy
        burned, heart rate, mindful sessions, and body measurements, as described in our{" "}
        <Link href="/skrong/privacy">Privacy Policy</Link>. We do not store or transmit your HealthKit data outside your
        device. You can change or revoke this permission at any time in iOS Settings → Privacy &amp; Security → Health
        → Skrong.
      </p>

      <h2>5. iCloud Backups</h2>
      <p>
        If you create backups, Skrong saves them to your iCloud Drive. Backups are managed by Apple and subject to
        Apple&rsquo;s Terms of Service. Americo LLC does not have access to your iCloud data. You are responsible for
        keeping backups of any data you wish to preserve; we are not responsible for data lost through device loss,
        deletion, or failed backups or restores.
      </p>

      <h2>6. Insights, Programs, and Imports</h2>
      <p>
        On supported devices, Skrong uses Apple&rsquo;s on-device Apple Intelligence to generate workout insights and
        to convert imported text into workouts and timers. Training programs may suggest changes to weights or reps
        based on progression rules. Insights, suggestions, and imported results are generated automatically and may be
        incomplete or inaccurate. Review them before relying on them.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content, design, code, and trademarks in Skrong are the property of Americo LLC or its licensors. Nothing in
        these Terms grants you any right to use our trademarks, logos, or other proprietary information without our
        prior written consent.
      </p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
      </p>
      <p>
        We do not warrant that the App will be uninterrupted, error-free, or free of viruses or other harmful
        components. Your use of the App is at your sole risk.
      </p>
      <p>
        Skrong is intended for general fitness tracking and timing purposes only. Its workouts, programs, progression
        suggestions, insights, and measurements are not a substitute for professional medical advice, diagnosis, or
        treatment. Consult a qualified healthcare provider before beginning any exercise program, and stop exercising
        if you feel pain, dizziness, or discomfort.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AMERICO LLC AND ITS MEMBERS, OFFICERS, EMPLOYEES, AND AGENTS
        SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
        RELATED TO YOUR USE OF THE APP, INCLUDING ANY INJURY OR LOSS OF DATA, EVEN IF WE HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE APP SHALL NOT EXCEED
        THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Americo LLC and its members, officers, employees, and agents
        from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees,
        arising out of or in any way connected with your access to or use of the App or your violation of these Terms.
      </p>

      <h2>11. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to the App at any time, with or without cause, and
        with or without notice. Upon termination, your license to use the App will immediately cease.
      </p>
      <p>You may stop using the App at any time by uninstalling it from your device.</p>

      <h2>12. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the State of Colorado, without regard
        to its conflict of law provisions.
      </p>
      <p>
        Any dispute arising out of or relating to these Terms or the App shall be resolved through binding arbitration
        administered under the rules of the American Arbitration Association, conducted in Denver, Colorado. You waive
        any right to a jury trial or to participate in a class action lawsuit.
      </p>

      <h2>13. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will update the effective date at the top of this
        page. Your continued use of the App after any changes constitutes your acceptance of the updated Terms. We
        encourage you to review these Terms periodically.
      </p>

      <h2>14. Severability</h2>
      <p>
        If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or
        eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
      </p>

      <h2>15. Entire Agreement</h2>
      <p>
        These Terms, together with our <Link href="/skrong/privacy">Privacy Policy</Link> and Apple&rsquo;s Licensed
        Application End User License Agreement, constitute the entire agreement between you and Americo LLC with
        respect to the App and supersede all prior agreements and understandings.
      </p>

      <h2>16. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at:</p>
      <p>
        Americo LLC
        <br />
        <a href="mailto:support@michaelpace.dev">support@michaelpace.dev</a>
      </p>
    </>
  );
}
