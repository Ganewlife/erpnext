# Copyright (c) 2019, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt


# import frappe
from frappe.model.document import Document


class POSField(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		custom_part_assureur: DF.Currency
		custom_part_assuré: DF.Currency
		default_value: DF.Data | None
		fieldtype: DF.Data | None
		options: DF.Text | None
		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		read_only: DF.Check
		reqd: DF.Check
	# end: auto-generated types

	pass
