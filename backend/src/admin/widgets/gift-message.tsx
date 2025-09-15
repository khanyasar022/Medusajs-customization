import { defineWidgetConfig } from "@medusajs/admin-sdk"

type Props = {
  order: { metadata?: Record<string, any> }
}

const GiftMessageWidget = ({ order }: Props) => {
  const message = order?.metadata?.gift_message
  if (!message) return null
  return (
    <div>
      <h3>Gift Message</h3>
      <p>{message}</p>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default GiftMessageWidget


