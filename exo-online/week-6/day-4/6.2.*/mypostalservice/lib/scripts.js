/**
 * Transaction deplacement
 * @param {fr.laposte.Deplacement} tx
 * @transaction
 */
async function deplacement(tx) {  
    tx.colis.localisation = tx.arrivee;
    const registre = await getAssetRegistry('fr.laposte.Colis');
    await registre.update(tx.colis);
}