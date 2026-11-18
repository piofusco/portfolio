import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skrong — Privacy Policy",
};

export default function SkrongPrivacyPolicy() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-1 text-muted">Skrong — Effective Date: November 18, 2026</p>
      </header>

      <h2>1. Introduction</h2>
      <p>
        Americo LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the Skrong mobile application
        (the &ldquo;App&rdquo;), formerly known as Secnds. This Privacy Policy explains how we handle your information
        when you use Skrong.
      </p>
      <p>
        We are committed to protecting your privacy. Skrong is designed to keep your data on your device and, if you
        choose, in backups stored in your personal iCloud Drive. We do not operate servers that receive your data.
      </p>

      <h2>2. Information We Collect</h2>

      <h3>Information You Provide</h3>
      <p>Skrong stores the data you create within the App, including:</p>
      <ul>
        <li>Gym workouts, exercises, sets, reps, weights, rests, and supersets</li>
        <li>Interval timers (HIIT, circuit, and round), their intervals, durations, and alerts</li>
        <li>Training programs and progression rules</li>
        <li>Custom exercises, folders, colors, labels, and settings</li>
        <li>Your workout and timer history, including effort ratings you record</li>
        <li>
          Body measurements you enter, such as height, weight, body fat percentage, and waist, chest, hip, neck, bicep,
          and thigh circumference
        </li>
      </ul>
      <p>This data is stored locally on your device using on-device storage.</p>

      <h3>iCloud Backups</h3>
      <p>
        If you are signed into iCloud and choose to create a backup, Skrong saves a backup file to the App&rsquo;s
        folder in your iCloud Drive so you can restore your data later or on another device. Backups are stored and
        handled by Apple and are subject to Apple&rsquo;s Privacy Policy (
        <a href="https://www.apple.com/legal/privacy/">https://www.apple.com/legal/privacy/</a>). Americo LLC does not
        have access to your iCloud data.
      </p>

      <h3>Apple Health (HealthKit) Integration</h3>
      <p>With your permission, Skrong integrates with Apple HealthKit.</p>
      <p>Skrong may write the following data to the Health app:</p>
      <ul>
        <li>Workouts (activity type, duration, start and end time)</li>
        <li>Active and resting (basal) energy burned</li>
        <li>Heart rate</li>
        <li>Mindful sessions</li>
        <li>Height, weight, body fat percentage, and waist circumference that you enter in the App</li>
      </ul>
      <p>Skrong may read the following data from the Health app:</p>
      <ul>
        <li>Active energy burned, to show calories in your workout history and analytics</li>
        <li>Height, weight, body fat percentage, and waist circumference, to prefill and track your body measurements</li>
      </ul>
      <p>
        HealthKit data is used only to provide features within the App. It is never used for advertising or
        marketing, and it is never transmitted to Americo LLC or any third party. You can change or revoke
        Skrong&rsquo;s access to HealthKit at any time in iOS Settings → Privacy &amp; Security → Health → Skrong.
      </p>

      <h3>On-Device Intelligence</h3>
      <p>
        On supported devices, Skrong uses Apple&rsquo;s on-device Foundation Models (Apple Intelligence) to generate
        workout insights from your history and body measurements, and to turn workout or timer text that you import
        into templates. This processing happens entirely on your device. Your data is not sent to Americo LLC or to any
        third-party AI service.
      </p>

      <h3>Notifications</h3>
      <p>
        If you allow notifications, Skrong schedules local notifications on your device, such as rest timer and
        interval alerts. Notifications are created on your device and are not sent through our servers.
      </p>

      <h3>Feedback You Send Us</h3>
      <p>
        If you choose to send feedback through the feedback link in the App, it opens a form on our website. We receive
        only what you submit:
      </p>
      <ul>
        <li>Your message and the feedback category you pick</li>
        <li>Any screenshots you attach</li>
        <li>Your email address, if you choose to give it so we can reply</li>
        <li>Your App version, iOS version, and device model, which the App adds to help us fix problems</li>
      </ul>
      <p>
        We use this information only to respond to you and improve Skrong. Submissions are stored privately with our
        hosting provider, Vercel, and delivered to our support inbox by our email provider, Resend. We keep feedback
        only as long as we need it, and you can ask us to delete yours at any time by emailing{" "}
        <a href="mailto:support@michaelpace.dev">support@michaelpace.dev</a>. Sending feedback is always optional.
      </p>

      <h3>Information We Do Not Collect</h3>
      <p>
        Apart from feedback you choose to send, we do not collect, transmit, or store any of the following on our
        servers:
      </p>
      <ul>
        <li>Personal identifiers (name, email address, phone number)</li>
        <li>Location data</li>
        <li>Device identifiers or advertising IDs</li>
        <li>Usage analytics or behavioral data</li>
        <li>HealthKit, body measurement, or other health-related data</li>
      </ul>
      <p>Skrong does not use advertising, analytics, or tracking SDKs, and does not track you across apps or websites.</p>

      <h2>3. In-App Purchases</h2>
      <p>
        Skrong offers an optional in-app purchase, Skrong Unlimited. All transactions are processed by Apple through
        the App Store. Americo LLC does not collect or store your payment information. Purchase records are subject to
        Apple&rsquo;s Privacy Policy.
      </p>

      <h2>4. How We Use Your Information</h2>
      <p>
        Because your data remains on your device (or in your personal iCloud Drive), Americo LLC does not use your
        data for any purpose. We have no access to it. The only exception is feedback you choose to send, which we use
        to respond to you and improve Skrong. The App uses your data on your device only to provide its
        features, such as running workouts and timers, showing your history and analytics, and generating insights.
      </p>

      <h2>5. Data Sharing and Disclosure</h2>
      <p>
        We do not sell, rent, or share your personal information with third parties. Apart from feedback you choose to
        send, we have no user data to share.
      </p>
      <p>
        You may choose to share your own data, for example by exporting your workout history or a workout as text and
        sending it through the iOS share sheet or clipboard. Anything you share this way goes only where you send it.
      </p>
      <p>The only third-party services involved in operating Skrong are:</p>
      <ul>
        <li>Apple App Store — for app distribution and in-app purchases</li>
        <li>Apple iCloud Drive — for optional backups, if you create them</li>
        <li>Apple HealthKit — for reading and writing health data, if you enable it</li>
        <li>Apple Intelligence — for on-device insights and text import, on supported devices</li>
        <li>Vercel — for hosting our website and storing feedback you send</li>
        <li>Resend — for delivering feedback you send to our support inbox</li>
      </ul>

      <h2>6. Data Retention and Deletion</h2>
      <p>
        Your data lives on your device and, if you create backups, in your iCloud Drive. You can delete your data at
        any time by:
      </p>
      <ul>
        <li>Deleting individual workouts, timers, programs, history, or measurements within the App</li>
        <li>Deleting backups from the App&rsquo;s backup screen or from iCloud Drive</li>
        <li>Uninstalling Skrong from your device</li>
        <li>Deleting data Skrong wrote to Apple Health from the Health app</li>
      </ul>
      <p>
        Americo LLC does not retain any copies of your App data on external servers. To delete feedback you sent, email{" "}
        <a href="mailto:support@michaelpace.dev">support@michaelpace.dev</a>.
      </p>

      <h2>7. Children&rsquo;s Privacy</h2>
      <p>
        Skrong is designed for users of all ages and is rated 4+ on the App Store. Because the App does not collect
        personal information from any user, it is compliant with the Children&rsquo;s Online Privacy Protection Act
        (COPPA) by default. If you are under 13, we encourage you to review this Privacy Policy with a parent or
        guardian.
      </p>

      <h2>8. Security</h2>
      <p>
        Because your data is stored locally on your device and optionally in your iCloud Drive, the security of your
        data depends primarily on your device passcode, Face ID/Touch ID settings, and your Apple Account security. We
        encourage you to use a strong passcode and enable two-factor authentication on your Apple Account.
      </p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will update the effective date at the top
        of this page. We encourage you to review this policy periodically. Continued use of Skrong after any changes
        constitutes your acceptance of the updated policy.
      </p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
      <p>
        Americo LLC
        <br />
        <a href="mailto:support@michaelpace.dev">support@michaelpace.dev</a>
      </p>
    </>
  );
}
