

import { format, parse, parseISO } from 'date-fns';

// Fonction pour formater la date
export const formatDate = (dateStr: string): string => {
    let date: Date;

    // Vérifier si la date est au format ISO (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        // Date au format ISO
        date = parseISO(dateStr);
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        // Date au format dd/MM/yyyy
        date = parse(dateStr, 'dd/MM/yyyy', new Date());
    } else {
        // Format non reconnu
        console.error(`Unsupported date format: ${dateStr}`);
        return 'Date invalide';
    }

    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
        // Gérer les dates invalides
        console.error(`Invalid date string: ${dateStr}`);
        return 'Date invalide';
    }

    // Retourner la date formatée
    return format(date, 'dd MMM yy').toUpperCase();
};

