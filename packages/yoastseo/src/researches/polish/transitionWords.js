/** @module config/transitionWords */

const singleWords = ["aby", "abym", "abyśmy", "abyś", "abyście", "acz", "aczkolwiek", "albowiem", "ale", "aliści", "ani", "ażeby", 
	"bądź", "bezspornie", "bezsprzecznie", "bo", "bowiem", "bynajmniej", "celem", "choć", "chociaż", "chociażby", "czyli", "dalej", 
	"dlatego", "dodatkowo", "dopóki", "dotychczas", "faktycznie", "gdy", "gdyby", "gdyż", "generalnie", "głównie", "ilekroć", "iż", 
	"jakkolwiek", "jednak", "jednakże", "jeszcze", "jeśli", "jeżeli", "kiedy", "kolejno", "kończąc", "lecz", "lub", "mianowicie", "mimo",
	"np", "nagle", "najpierw", "następnie", "natomiast", "naturalnie", "natychmiast", "ni", "niebawem", "niedługo", "niegdyś", 
	"niejednokrotnie", "niemniej", "niespodziewanie", "niewątpliwie", "niezaprzeczalnie", "niż", "niniejszym", "notabene", "obecnie", 
	"oczywiście", "ogólnie", "ogółem", "oprócz", "oraz", "podczas", "podobnie", "ostatecznie", "owszem", "podobnie", "podsumowując", 
	"pokrótce", "pomimo", "ponadto", "ponieważ", "poprzednio", "poprzez", "potem", "póki", "później", "przecież", "przeto", "przykładowo", 
	"przynajmniej", "raczej", "również", "rzeczywiście", "skoro", "skrótowo", "także", "też", "toteż", "tudzież", "tymczasem", "uprzednio", 
	"wcześniej", "wedle", "według", "wielokrotnie", "więc", "wkrótce", "właściwie", "wobec", "wpierw", "wprawdzie", "wraz", "wreszcie", 
	"wskutek", "wstępnie", "wszak", "wszakże", "wszelako", "wtem", "zamiast", "zanim", "zarówno", "zasadniczo", "zaś", "zatem", "znacząco", 
	"znacznie", "zresztą", "zwłaszcza", "żeby", "żebym", "żebyś", "żebyście", "żebyśmy"
];

const multipleWords = ["a konkretnie", "a propos", "aby wrocić do rzeczy", "analogicznie do", "bacząc na to że",
	"bądź co bądź", "bez wątpliwości", "bez wątpienia", "bez względu", "biorąc pod uwagę", "choćby", "chodzi o to", "chyba że", 
	"co do", "co gorsza", "co najmniej", "co prawda", "co się tyczy", "co ważniejsze", "co więcej", "czy też", "dla przykładu", 
	"dzięki czemu", "dzięki któremu", "dzięki której", "dzięki którym", "dzięki temu", "faktem jest że", "inaczej mówiąc", 
	"innymi słowy", "jak dotąd", "jak już mówiłam", "jak już mówiłem", "jak już wspomniano", "jak widać", "jako przykład", 
	"jako że", "jednym słowem", "jeśli chodzi o", "jeżeli chodzi o", "konkretnie to", "krótko mówiąc", "łącznie z", "mając to na uwadze", 
	"mam na myśli", "mamy na myśli", "mówiąc w skrócie", "na celu", "na chwilę obecną", "na dłuższą metę", "na dodatek", "na koniec", 
	"na końcu", "na pewno", "na przykład", "na skutek", "na tę chwilę", "na wstęp", "na wypadek gdyby", "na zakończenie", "nade wszystko", 
	"należy pamiętać", "nawiasem mówiąc", "nie mówiąc już", "nie mówiąc o tym", "nie pomijając", "nie schodząc z tematu", "nie tylko", 
	"nie wspominając", "nie zważając na", "o ile", "o tyle", "od czasu do czasu", "od momentu", "odnośnie do", "ogólnie mówiąc", 
	"ogólnie rzecz biorąc", "oznacza to że", "po czwarte", "po drugie", "po piąte", "po pierwsze", "po to", "po trzecie", "pod warunkiem",
	"podczas gdy", "podczas kiedy", "podobnym sposobem", "ponad wszystko", "poza tym", "prawdę mówiąc", "prawdę powiedziawszy", 
	"prędzej czy później", "przechodząc do", "przede wszystkim", "przez co", "przez tą", "przez tego", "przez to", "przy tym", 
	"przyjmując że", "przypuściwszy że", "raz na jakiś czas", "rzecz jasna", "ściśle biorąc", "ściśle mówiąc", "skutkiem tego", 
	"tak czy inaczej", "tak czy owak", "tak naprawdę", "taka jak", "taki jak", "takich jak", "takie jak", "to znaczy", "tym samym", 
	"w celu", "w ciągu", "w dodatku", "w efekcie", "w gruncie rzeczy", "w innych słowach", "w istocie", "w każdym razie", "w konsekwencji",
	"w końcu", "w kwestii", "w międzyczasie", "w nadziei że", "w obawie że", "w odróżnieniu", "w podobny sposób", "w podsumowaniu", 
	"w przeciwieństwie do", "w przeciwnym razie", "przeciwnym wypadku", "w przypadku", "w ramach", "w razie", "w rezultacie", 
	"w rozumieniu że", "w rzeczy samej", "w rzeczywistości", "w skrócie", "w szczególności", "w takim razie", "w tej sytucaji",
	"w ten sposób", "w tych okolicznościach", "w tym przypadku", "w tym wypadku", "w wyniku", "w zasadzie", "w związku z",
	"wbrew pozorom", "włącznie z", "wracając do rzeczy", "wracając do tematu", "wręcz przeciwnie", "z drugiej strony",
	"z drugiej zaś strony", "z jednej strony", "z kolei", "z mocy że", "z obawy że", "z pewnością", "z powodu", "z przyczyny",
	"z tą intencją", "z tego powodu", "z uwagi że", "zacznijmy od", "zakładając że", "ze względu na", "ze względu że",
	"zważywszy na to", "zważywszy że"
];

/**
 * Returns an list with transition words to be used by the assessments.
 * @returns {Object} The list filled with transition word lists.
 */
export default function() {
	return {
		singleWords: singleWords,
		multipleWords: multipleWords,
		allWords: singleWords.concat( multipleWords ),
	};
}
