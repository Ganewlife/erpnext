frappe.provide("erpnext.PointOfSale");

frappe.pages["point-of-sale"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Point of Sale"),
		single_column: true,
	});

	frappe.require("point-of-sale.bundle.js", function () {
		wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
		window.cur_pos = wrapper.pos;
	});
};

frappe.pages["point-of-sale"].refresh = function (wrapper) {
	if (document.scannerDetectionData) {
		onScan.detachFrom(document);
		wrapper.pos.wrapper.html("");
		wrapper.pos.check_opening_entry();
	}
};
frappe.ui.form.on('POS Invoice', {
    refresh: function(frm) {
        calculate_totals(frm);
    },
    items_add: function(frm) {
        calculate_totals(frm);
    },
    items_remove: function(frm) {
        calculate_totals(frm);
    },
    refresh: function(frm) {
        // console.log("script patient executé");
        const patient = get_valid_patient();
        if (patient) {
            console.log("Patient valide trouvé:", patient);
            // Continuez avec le traitement si le patient est valide
        } else {
            console.log("Aucun patient valide trouvé.");
            // Gérez le cas où aucun patient valide n'a été trouvé
        }
    }
});

frappe.ui.form.on('POS Invoice Item', {
    custom_part_assureur: function(frm, cdt, cdn) {
        calculate_totals(frm);
    },
    custom_part_assuré: function(frm, cdt, cdn) {
        calculate_totals(frm);
    },
    qty: function(frm, cdt, cdn) {
        calculate_totals(frm);
    }
});

function calculate_totals(frm) {
    let total_assuré = 0;
    let total_assureur = 0;

    frm.doc.items.forEach(item => {
        total_assuré += (item.custom_part_assuré || 0) * (item.qty || 1);
        total_assureur += (item.custom_part_assureur || 0) * (item.qty || 1);
    });

    frm.set_value('total_assuré', total_assuré);
    frm.set_value('total_assureur', total_assureur);
}


async function get_valid_patient() {
    console.log("interieur script patient executé");
    const doc = frappe.ui.form.get_current();
    const customer = doc.doc.customer;

    // Vérifier si le client existe dans le Doctype Patient
    const patient = await frappe.db.get_value('Patient', { 'customer': customer }, 'name');
    if (!patient) {
        return false;
    }

    // Récupérer les informations du patient
    const patient_doc = await frappe.db.get_doc('Patient', patient.name);

    // Vérifier les dates
    const today = frappe.datetime.get_today();
    if (frappe.datetime.compare(today, patient_doc.date_echeance) > 0 ||
        frappe.datetime.compare(today, patient_doc.date_retrait) > 0 ||
        frappe.datetime.compare(today, patient_doc.date_de_debut) < 0) {
        return false;
    }

    // Vérifier les souscriptions
    const souscriptions = await frappe.db.get_list('Souscription assurance', { 
        filters: [
            ['echeance_contrat', '>=', today],
            ['beneficiaire_individuel', '=', patient_doc.name]
        ],
        fields: ['name']
    });

    if (souscriptions.length === 0) {
        const group_souscriptions = await frappe.db.get_list('Souscription assurance', {
            filters: [
                ['echeance_contrat', '>=', today],
                ['beneficiaires_groupe', 'in', patient_doc.name]
            ],
            fields: ['name']
        });

        if (group_souscriptions.length === 0) {
            return false;
        }
    }

    return patient_doc;
}


