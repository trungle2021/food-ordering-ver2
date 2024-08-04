/*
    * User click checkout:
        ** get all item from current cart
        ** check stock for each item
        ** create new order
            ? order_status: PENDING
            ? payment_status: PENDING

    * User not proceed and go back then re-click checkout:
        **  If in order collection has any order with order_status = PENDING. If so return that order (bussiness logic is one user only has one order at a time)
        **  if not -> back to User click checkout

        ! CANCEL case:
            * User cancel order:
                ! User only able to cancel order when order_status current is PENDING
                * send email to admin
                ? order_status = CANCELED
                ? cancel_reason =
            * Admin cancel order:
                ! Admin only able to cancel order when order_status current is PENDING, PROCESSING
                * send email to user
                ? order_status = CANCELED

    * User proceed to payment:
        ** Change order_status if payment success:
                ? payment_status = PAID
                ? order_status = PROCESSING

    * Admin prepare order then start to ship to user:
        ? order_status: SHIPPING

        ! CANCEL case:
            * Admin cancel order:
                ! Admin only able to cancel order when order_status current is PENDING, PROCESSING
                * send email to user
                ? order_status = CANCELED
                ? cancel_reason: ADMIN CANCEL

    * Finish Order:
        ? order_status: COMPLETED

*/
