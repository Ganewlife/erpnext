# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class UnreconcilePayments(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from erpnext.accounts.doctype.unreconcile_payment_entries.unreconcile_payment_entries import UnreconcilePaymentEntries
		from frappe.types import DF

		allocations: DF.Table[UnreconcilePaymentEntries]
		amended_from: DF.Link | None
		company: DF.Link | None
		voucher_no: DF.DynamicLink | None
		voucher_type: DF.Link | None
	# end: auto-generated types
	pass
