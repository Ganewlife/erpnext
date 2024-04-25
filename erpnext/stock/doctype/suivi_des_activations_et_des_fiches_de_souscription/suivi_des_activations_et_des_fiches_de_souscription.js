// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Suivi des activations et des fiches de souscription", {
	refresh(frm) {

	},

    onload: function(frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Depot vente - ID cartes',
                fields: ['id_carte'],
                filters: {
                    // Ajoutez des filtres si nécessaire
                }
            },
            callback: function(response) {
                var data = response.message;
                if (data) {
                    // Récupérer tous les ID de cartes
                    var id_cartes = data.map(function(item) {
                        return item.id_carte;
                    });
                    
                    // Requête pour récupérer les informations des cartes à partir de la doctype "Depot vente cartes"
                    frappe.call({
                        method: 'frappe.client.get_list',
                        args: {
                            doctype: 'Depot vente cartes',
                            fields: ['id', 'date_du_dépôt', 'commercial', 'distributeur', 'date_opération', 'date_collecte'],
                            filters: {
                                'parent': ['in', id_cartes]
                            }
                        },
                        callback: function(response) {
                            var cartes_data = response.message;
                            if (cartes_data) {
                                // Ajouter les informations des cartes dans le formulaire
                                $.each(cartes_data, function(index, carte) {
                                    var row = frm.add_child('cartes_depot_vente');
                                    row.id_carte = carte.id;
                                    row.date_depot = carte.date_du_dépôt;
                                    row.date_opération = carte.date_opération;
                                    row.date_collecte = carte.date_collecte;
                                    row.distributeur = carte.distributeur;
                                    row.commercial = carte.commercial;
                                    // Vous pouvez ajouter d'autres champs de votre Doctype principal selon vos besoins
                                });
                                frm.refresh_field('cartes_depot_vente');
                            }
                        }
                    });
                }
            }
        });
    }
    
    
    
    

    /* onload: function(frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Depot vente cartes',
                fields: ['liste_des_id_de_cartes', 'date_du_dépôt', 'nombre_de_cartes', 'référence_du_bc', 'distributeur', 'commercial', 'date_opération', 'date_collecte'], 
                filters: {
                    // Ajoutez des filtres si nécessaire
                }
            },
            callback: function(response) {
                var data = response.message;
                // Parcourir les données récupérées et les afficher dans le tableau
                if (data) {
                    $.each(data, function(index, item) {
                        var row = frm.add_child('cartes_depot_vente');
                        // Récupérer les ID de cartes à partir de la table liée
                        var id_cartes = '';
                        if (item.liste_des_id_de_cartes) {
                            $.each(item.liste_des_id_de_cartes, function(idx, carte) {
                                id_cartes += carte.id_carte + ', ';
                            });
                            // Supprimer la virgule en trop à la fin
                            id_cartes = id_cartes.slice(0, -2);
                                id_car = 020202;
                        }
                        id_car = 020202;
                        row.id_cartes = id_car;
                        row.date_depot = item.date_du_dépôt;
                        row.date_opération = item.date_opération;
                        row.date_collecte = item.date_collecte;
                        row.nombre_des_cartes = item.nombre_de_cartes;
                        row.reference_du_bc = item.référence_du_bc;
                        row.distributeur = item.distributeur;
                        row.commercial = item.commercial;
                        // Ajouter d'autres champs de votre Doctype principal selon vos besoins
                    });
                    frm.refresh_field('cartes_depot_vente');
                }
            }
        });
    } */
    

    /*onload: function(frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Depot vente cartes',
                fields: ['liste_des_id_de_cartes', 'date_du_dépôt', 'nombre_de_cartes', 'référence_du_bc', 'distributeur', 'commercial'], 
                filters: {
                    // Ajoutez des filtres si nécessaire
                }
            },
            callback: function(response) {
                var data = response.message;
                // Parcourir les données récupérées et les afficher dans le tableau
                if (data) {
                    $.each(data, function(index, item) {
                        if (item.liste_des_id_de_cartes) {
                            // Pour chaque enregistrement dans la table liée, ajouter une ligne de tableau
                            $.each(item.liste_des_id_de_cartes, function(idx, carte) {
                                var row = frm.add_child('cartes_depot_vente');
                                row.id_cartes = carte.id_carte;
                                row.date_depot = item.date_du_dépôt;
                                row.nombre_des_cartes = item.nombre_de_cartes;
                                row.reference_du_bc = item.référence_du_bc;
                                row.distributeur = item.distributeur;
                                row.commercial = item.commercial;
                                // Ajouter d'autres champs de votre Doctype principal selon vos besoins
                            });
                        } else {
                            // Si la table liée est vide, ajouter simplement une ligne avec les autres champs remplis
                            var row = frm.add_child('cartes_depot_vente');
                            row.date_depot = item.date_du_dépôt;
                            row.nombre_des_cartes = item.nombre_de_cartes;
                            row.reference_du_bc = item.référence_du_bc;
                            row.distributeur = item.distributeur;
                            row.commercial = item.commercial;
                            // Ajouter d'autres champs de votre Doctype principal selon vos besoins
                        }
                    });
                    frm.refresh_field('cartes_depot_vente');
                }
            }
        });
    }*/
    
    
    
    
});
