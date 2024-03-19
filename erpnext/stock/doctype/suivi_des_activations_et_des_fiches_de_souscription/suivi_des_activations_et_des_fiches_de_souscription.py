# Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Suividesactivationsetdesfichesdesouscription(Document):
    # begin: auto-generated types
    # This code is auto-generated. Do not modify anything in this block.

    from typing import TYPE_CHECKING

    if TYPE_CHECKING:
        from frappe.model.document import Document
        from frappe.types import DF

        cartes_depot_vente: DF.Table[Document]
    # end: auto-generated types
    
    """ def onload(self):
        # Récupérer le champ "distributeur" du dernier document "Depot vente cartes" créé
        dernier_depot = frappe.get_all("Depot vente cartes", filters={}, fields=["distributeur"], order_by="creation desc", limit=1)
        #frappe.throw(_("Aucun dépôt de vente de cartes trouvé."))
        
        if dernier_depot:
            distributeur = dernier_depot[0].distributeur
            
            # Mettre à jour le champ "dépôt_vente_cartes" du document en cours
            self.depot_vente_cartes += f"<p>Distributeur: {distributeur}</p>"
        else:
            frappe.throw(_("Aucun dépôt de vente de cartes trouvé."))
 """

