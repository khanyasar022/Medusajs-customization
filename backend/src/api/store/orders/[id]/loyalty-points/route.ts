import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import type { IOrderModuleService } from "@medusajs/types"
import LoyaltyModuleService from "../../../../../modules/loyalty/service"
import { Modules } from "@medusajs/framework/utils"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params

  const orderModuleService: IOrderModuleService = req.scope.resolve(
    Modules.ORDER
  )
  const loyaltyService: LoyaltyModuleService = req.scope.resolve("loyalty")

  const order = await orderModuleService.retrieveOrder(id)
  const points = loyaltyService.calculatePointsFromOrder({ total: order.total })

  res.json({ order_id: id, loyalty_points: points })
}


