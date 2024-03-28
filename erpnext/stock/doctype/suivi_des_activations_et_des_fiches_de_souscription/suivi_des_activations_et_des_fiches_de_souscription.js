// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Suivi des activations et des fiches de souscription", {
	refresh(frm) {

	},

    onload: function(frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            id_cartes =j
            args: {
                doctype: 'Depot vente cartes',
                fields: ['id_cartes', 'date_du_dépôt', 'nombre_de_cartes', 'référence_du_bc', 'distributeur', 'commercial'], 
                filters: {
                    // des filtres si nécessaire
                }
            },
            callback: function(response) {
                var data = response.message;
                // Parcourir les données récupérées et les afficher dans le tableau
                if (data) {
                    $.each(data, function(index, item) {
                        var row = frm.add_child('cartes_depot_vente');
                        row.id_cartes = item.id_cartes;
                        row.date_depot = item.date_du_dépôt;
                        row.nombre_des_cartes = item.nombre_de_cartes;
                        row.reference_du_bc = item.référence_du_bc;
                        row.distributeur = item.distributeur;
                        row.commercial = item.commercial;
                        // Ajoutez d'autres champs de votre Doctype principal selon vos besoins
                    });
                    frm.refresh_field('cartes_depot_vente');
                }
            }
        });
    }
});
