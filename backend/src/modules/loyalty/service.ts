import type { OrderDTO } from "@medusajs/medusa/dist/types/common"

/**
 * Loyalty module service
 * Calculates loyalty points from an order total.
 * Rule: 1 point per $10 spent. Totals are in cents.
 */
class LoyaltyModuleService {
  /**
   * Calculate loyalty points from an order DTO.
   * @param order The order DTO containing at least the `total` in cents
   */
  calculatePointsFromOrder(order: Pick<OrderDTO, "total">): number {
    const totalInCents = order.total || 0
    const points = Math.floor(totalInCents / 1000)
    return points
  }
}

export default LoyaltyModuleService


