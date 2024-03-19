// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Suivi des activations et des fiches de souscription", {
	refresh(frm) {

	},

    onload: function(frm) {
        // Charger les données depuis le Doctype "Depot vente cartes"
        /* var static_data = [
            {
                date_du_dépôt: '2023-01-01',
                nombre_de_cartes: 10,
                référence_du_bc: 'BC001',
                distributeur: 'Distributeur 1',
                commercial: 'Commercial 1'
            },
            {
                date_du_dépôt: '2023-01-02',
                nombre_de_cartes: 15,
                référence_du_bc: 'BC002',
                distributeur: 'Distributeur 2',
                commercial: 'Commercial 2'
            },
            // Ajoutez d'autres lignes statiques selon vos besoins
        ];
    
        // Parcourir les données statiques et les ajouter au tableau
        if (static_data) {
            $.each(static_data, function(index, item) {
                var row = frm.add_child('cartes_depot_vente');
                row.date_depot = item.date_du_dépôt;
                row.nombre_des_cartes = item.nombre_de_cartes;
                row.reference_du_bc = item.référence_du_bc;
                row.distributeur = item.distributeur;
                row.commercial = item.commercial;
                // Ajoutez d'autres champs de votre Doctype principal selon vos besoins
            });
            frm.refresh_field('cartes_depot_vente');
        } */

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
