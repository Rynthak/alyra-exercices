from random import randint
print("Recherche d'un nombre entre 1 et 100 par le client.")
valsearch  = randint(1, 100)
print("Nombre a rechercher : " + str(valsearch))
texteMessage    =    "Coucou devine le nombre "
response="";

while(response!=valsearch and response!=0):
    response = input(texteMessage)
    if(response == valsearch):
        print("Bravo la reponse etait : "+str(valsearch))    
        break;
     
    texteMessage="C'est Plus "
    
    if valsearch < response:
        texteMessage= "C'est Moins "
    
    if abs(valsearch-response)>1 and abs(valsearch-response)<=5 :
        texteMessage= texteMessage+" C'est Tres HOT"
        
    if abs(valsearch-response)>5 and abs(valsearch-response)<=10 :
        texteMessage= texteMessage+" C'est HOT "    
    


print("Fin")    