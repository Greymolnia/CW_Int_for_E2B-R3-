export const EMPTY_DRUG = {
    drugcharacterization: '',
    medicinalproductname: '',
    drugauthorizationholder: '',
    drugbatchnumber: '',
    drugindication: '',
    drugindicationmeddraversion: '',
    drugindicationmeddrallt: '',

    drugdosagetext: '',
    drugstructuredosagenumb: '',
    drugstructuredosageunit: '',
    drugadministrationroute: '',
    drugdosageform: '',

    drugstartdate: '',
    drugenddate: '',
    drugtreatmentduration: '',
    drugtreatmentdurationunit: '',

    drugactiontaken: '',
    drugreactionrecurreadministration: '',
    drugadditional: ''
};

export const EMPTY_REACTION = {
    reactionprimarysourcereaction: '',
    reactionmeddrallt: '',
    reactionoutcome: '',
    reactionstartdate: '',
    reactionenddate: '',
    reactionduration: '',
    reactiondurationunit: ''
};

export const EMPTY_TEST = {
    testname: '',
    testresult: '',
    testunit: '',
    testlow: '',
    testhigh: '',
    testdate: ''
};

export const INITIAL_STATE = {
    admin: {
        safetyreportid: '',
        safetyreportversion: '',
        safetyreportform: '',
        receiptdate: '',
        transmissiondate: '',

        reportergivenname: '',
        reporterfamilyname: '',
        reporterorganization: '',
        reportercountry: '',
        qualification: '',
        literaturesource: '',

        senderorganization: '',
        senderdepartment: '',
        sendertype: '',
        receiverorganization: '',
        receiverid: ''
    },

    patient: {
        patientinitial: '',
        patientsex: '',
        patientagegroup: '',
        patientage: '',
        patientageunit: '',
        patientweight: '',
        patientheight: '',
        patientmedicalhistorytext: '',
        patientdeathdate: ''
    },

    drugs: [{ ...EMPTY_DRUG }],

    reactions: [{ ...EMPTY_REACTION }],

    tests: [{ ...EMPTY_TEST }],

    investigation: {
        studyname: '',
        studysponsorname: '',
        studytypenumb: '',

        autopsyyesno: '',
        autopsydonedeterm: ''
    },

    summary: {
        companyassessmentmeddrallt: '',
        companyassessmentcomment: '',

        seriousnessdeath: false,
        seriousnesslifethreatening: false,
        seriousnesshospitalization: false,
        seriousnessdisabling: false,
        seriousnesscongenitalanomali: false,
        seriousnessother: false,

        causalityassessmentsource: '',
        causalityassessmentmethod: '',
        causalityassessmentresult: '',

        documentlist: '',
        reportnullification: '',
        reportnullificationreason: '',

        narrativeincludeclinical: '',
        mostrecentreceiptdate: '',
        duplicate: '1',
        duplicatesource: ''
    }
};