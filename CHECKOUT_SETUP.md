# Checkout and paid download setup

Loupe uses a **Lemon Squeezy hosted checkout**. Lemon Squeezy acts as merchant of record, handles supported global payment methods and sales tax/VAT, and delivers the paid file without exposing it in this repository.

## Why hosted checkout

- No card data touches `loupe.heg.wtf`.
- Tax/VAT and payment compliance are handled by the merchant of record.
- The notarized app file remains private and is delivered after payment.
- Customers can recover purchases at <https://app.lemonsqueezy.com/my-orders> with their checkout email.

## One-time production setup

1. Create/activate the HEG Lemon Squeezy store. Account activation and payout/KYC must be completed by the legal account owner.
2. Create a product named **Loupe for Mac**.
3. Create one one-time variant:
   - Price: **USD 14.99**
   - Subscription: **off**
   - Suggested description: `Private, on-device natural-language photo search for macOS 26+.`
4. Attach the signed and Apple-notarized Loupe `.dmg` or `.zip` as the product file. Do **not** put the paid artifact in `assets/` or any public branch.
5. In checkout settings, use `https://loupe.heg.wtf/success/` as the post-purchase/confirmation destination when that option is available. Lemon Squeezy's receipt and My Orders remain the source of truth for file delivery.
6. Copy the share URL, which looks like `https://STORE.lemonsqueezy.com/buy/VARIANT_ID`.
7. Set it in `config.js`:

```js
checkoutUrl: "https://STORE.lemonsqueezy.com/buy/VARIANT_ID",
```

8. In Lemon Squeezy test mode, verify:
   - Every **Get/Buy Loupe** CTA opens hosted checkout.
   - The checkout shows **$14.99 one-time**, not a subscription.
   - A successful test order exposes the correct build and sends a receipt email.
   - My Orders can download the same file again.
   - Cancellation returns safely to the site.
9. Switch the store/product to live only after the download is signed, notarized, and malware-scanned.

## Safe inactive state

With `checkoutUrl: ""`, purchase buttons show a launch-pending dialog instead of accepting money or linking to an invalid checkout. This is intentional. The site becomes purchasable by changing only the public checkout URL.

## Release checklist

- [ ] HEG legal entity, payout account, and tax/KYC approved
- [ ] Loupe build signed with Developer ID and notarized by Apple
- [ ] Product file uploaded privately to Lemon Squeezy
- [ ] Price shown as USD 14.99 one-time in test checkout
- [ ] Receipt, initial download, and My Orders re-download tested
- [ ] Refund/support contact set to `me@heg.wtf`
- [ ] Live checkout URL added to `config.js`

Official references: [Hosted checkout](https://docs.lemonsqueezy.com/help/checkout/hosted-checkout), [Merchant of record](https://docs.lemonsqueezy.com/help/payments/merchant-of-record), [My Orders](https://docs.lemonsqueezy.com/help/online-store/my-orders).
