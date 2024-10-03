/*
    * User clicks checkout:
        ** Get all items from current cart
        ** Check stock for each item
        ** Create a temporary checkout session (not an order yet)
            ? Store cart items, total, user info, etc.

    * User reviews checkout:
        ** If existing checkout session, load it
        ** If not, create new checkout session
        ** Allow user to modify shipping address, payment method, etc.
        ** Update checkout session with any changes

    * User proceeds to payment:
        ** Process payment
        ** If payment successful:
            ? Create new order
                ? order_status: PROCESSING
                ? payment_status: PAID
            ? Clear user's cart
            ? Clear checkout session
        ** If payment fails:
            ? Notify user
            ? Allow retry or return to checkout

    ! CANCEL case:
        * User abandons checkout:
            ? Checkout session expires after set time (e.g., 30 minutes)
            ? No action needed on cart or inventory

    * Admin prepares order then starts to ship to user:
        ? Update order_status: SHIPPING

    ! CANCEL case:
        * Admin cancels order:
            ! Admin only able to cancel order when order_status is PROCESSING or SHIPPING
            * Send email to user
            ? Update order_status: CANCELED
            ? Set cancel_reason: ADMIN_CANCEL

    * Order delivered:
        ? Update order_status: DELIVERED

    * After delivery period or user confirms:
        ? Update order_status: COMPLETED

    * User requests refund/return:
        ? Create return request
        ? Admin reviews and processes return
        ? If approved:
            ? Update order_status: RETURNED
            ? Process refund
*/
