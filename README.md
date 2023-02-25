
<h1 align="center">
  Przejazdy Mielno
  <br>
</h1>

<h4 align="center">Aplikacja służąca do zamawiania usługi przewozu dla osób z niepełnosprawnościami oraz koordynacji zamówionych przejazdów. Sprawdź działanie aplikacji <a href="https://www.przejazdy.mielno.pl/" target="_blank">na żywo.</a>
  
 </h4>

<p align="center">
  <a href="#funkcjonalność">Funkcjonalność</a> •
  <a href="#jak-używać">Jak używać</a> •
  <a href="#technologie">Technologie</a> •
  <a href="#licencja">Licencja</a>
</p>

![screenshot](https://i.imgur.com/pbTps5b.png)

## Funkcjonalność

* Zamawianie usługi przejazdu online
  - Prosty formularz za pomocą którego można szybko zamówić usługę przejazdu
  - Automatyczne wypełnianie kodu pocztowego na podstawie wybranej miejscowości
  - Pola wyświetlające się warunkowo w zależności od wybranych opcji
  - Weryfikacja poprawności pól wypełnionego formularza 

* Powiększanie tekstu i zmiana kontrastu
  - 80% korzystających z aplikacji to osoby powyżej 70 roku życia. Dlatego aplikacja została przystosowana do osób, które mogą mieć problemy ze wzrokiem
* Sekcja FAQ
  - Powtarzające się pytania? Wykorzystaj sekcję FAQ, by wyjaśnić korzystającym z aplikacji wszystkie zasady związane z usługą
* Responsywność
  - Zarówno strona główna, jak i panel koordynatora są responsywne 


* <a href="https://www.przejazdy.mielno.pl/admin" target="_blank">Panel koordynatora</a> pozwala w przejrzysty sposób zbierać dane dotyczące zamówionych przejazdów
  - Edycja zamówionych już przejazdów
  - Zmiana statusów przejazdów (**ZAMÓWIONE -> POTWIERDZONE -> ZREALIZOWANE**). Po zmianie statusu, zamawiający otrzymuje komunikat SMS związany z potwierdzeniem zgłoszonych informacji
  - Usuwanie anulowanych przejazdów
  - Duplikowanie często powtarzających się zamówień 
  - Drukowanie kart przejazdów dla kierowcy
  - Pobieranie zbiorczego CSV z zamówionymi przejazdami
<br>

![screenshot](https://i.imgur.com/GEGLwdL.png)

## Jak używać

Do sklonowanie aplikacji i jej użycia potrzebne są [Git](https://git-scm.com) oraz [npm](http://npmjs.com). Skorzystaj z następujących komend.  

```
# Klonowanie repozytorium
$ git clone https://github.com/czaplinskim/PrzejazdyMielno

# Przejście do repozytorium
$ cd Przejazdy

# Instalowanie paczek
$ npm install

# Uruchom projekt w trybie development
$ npm run serve

# Uruchom projekt w trybie production
$ npm run build
```

## Technologie

Aplikacja używa następujących technologii:

- [Vue 2](https://nodejs.org/)
- [Vue Router](https://github.com/vuejs/router)
- [Firebase](https://firebase.google.com/)
- [ElementUI](https://github.com/ElemeFE/element)
- [API SerwerSMS](https://serwersms.pl/api)
- [Vue JSON to CSV file](https://github.com/Belphemur/vue-json-csv)

## Licencja

MIT

