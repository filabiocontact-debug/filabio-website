# Arabic/Darija as the primary language

## Changes
- Make Arabic the server-rendered and first-visit language across every public page.
- Set the initial document direction to RTL so Arabic appears correctly before the page becomes interactive.
- Keep the عربية / FR switch active and continue remembering a visitor’s explicit choice.
- Verify the homepage, product page, and order form load in Arabic by default on desktop and mobile.

## Technical details
- Update the shared language provider’s safe default and initial state from French/LTR to Arabic/RTL.
- Update the root HTML language and direction attributes to `ar` and `rtl`.
- Keep the current URL and local-storage language overrides so French remains available.
