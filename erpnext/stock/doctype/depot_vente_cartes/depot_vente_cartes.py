# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Depotventecartes(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.model.document import Document
		from frappe.types import DF

		commercial: DF.Link | None
		date_collecte: DF.Date | None
		date_du_dépôt: DF.Date | None
		date_opération: DF.Date | None
		distributeur: DF.Link | None
		liste_des_id_de_cartes: DF.Table[Document]
		naming_series: DF.Literal["DEP-VE-.#####"]
		nombre_de_cartes: DF.Float
		référence_du_bc: DF.Link | None
	# end: auto-generated types
	pass
	"""
	def before_validate(self): 
		#self.set('dépôt_vente_cartes', self.type_dopération)
		suivi_activations = frappe.get_doc("Suivi des activations et des fiches de souscription", {"nom_du_champ_unique": self.nom_du_champ_unique})
        suivi_activations.dépôt_vente_cartes = self.date_du_dépôt
        suivi_activations.save()

	def update_suivi_activations(document, method):
		# Récupérer tous les champs du document "Depot vente cartes"
		depot_vente_cartes_fields = frappe.get_doc("Depot vente cartes", document.name).as_dict()

		# Créer une liste de champs à inclure dans le champ "dépôt_vente_cartes" du doctype "Suivi des activations et des fiches de souscription"
		fields_to_include = {}
		for field, value in depot_vente_cartes_fields.items():
			if not field.startswith("__"):
				fields_to_include[field] = value

		# Mettre à jour le champ "dépôt_vente_cartes" dans le document "Suivi des activations et des fiches de souscription"
		frappe.db.set_value("Suivi des activations et des fiches de souscription", document.name, "dépôt_vente_cartes", fields_to_include)

	# Attacher les fonctions de mise à jour aux hooks correspondants
	def attach_hooks():
		frappe.db.event('Depot vente cartes', 'on_update')(update_suivi_activations)
		frappe.db.event('Depot vente cartes', 'on_insert')(update_suivi_activations)

	# Appeler la fonction d'attachement des hooks
	if __name__ == "__main__":
		attach_hooks()"""
