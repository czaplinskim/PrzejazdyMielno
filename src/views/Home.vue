<template>
  <div class="home">
    
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="navbar-content">
            <div class="navbar-content__element">
              <h6 class='tx__main-color--navbar tx__extrabold'>Czcionka:</h6>
              <button @click='decreaseFont()' :disabled='!(this.increaseValue > -1)' class='button tx__main-color--navbar tx__18 tx__extrabold button__no-border button__transparent'>A-</button>
              <button @click='increaseFont()' :disabled='!(this.increaseValue < 2)' class='button tx__main-color--navbar tx__22 tx__extrabold button__no-border button__transparent'>A+</button>
            </div>

            <div class="navbar-content__element">
              <h6 class='tx__main-color--navbar tx__extrabold' >Kontrast:</h6>
              <button @click='deleteContrast()' class='button button__small-margin tx__main-color--navbar tx__18 tx__extrabold button__transparent button__blue-border'>A</button>
              <button @click='contrast()' class='button button__small-margin tx__yellow tx__18 tx__extrabold button__black button__black-border'>A</button>
            </div>

            <div class="navbar-content__element">
              <a href='#'><img src='../assets/logo_FE.jpg' class='navbar-content__logo' alt=''></a>
              <a href='#'><img src='../assets/logo_UE.jpg' class='navbar-content__logo' alt=''></a>
            </div>

          </div>
        </div>
      </el-col>

    </el-row>

 
    <el-row class='main-container'>
      <h1 class=' main-header tx__extrabold tx__72 tx__margin-medium tx__main-color'>Zamów  przejazd!</h1>
      <div class='sub-container'>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <p class='tx__18 tx__black tx__margin-medium-bottom'>W celu zapobieganiu wykluczenia osób niepełnosprawnych <strong>Gmina Mielno</strong> zaprasza do skorzystania z <strong>bezpłatnej</strong> usługi przewozu osób, które mają trudności w samodzielnym przemieszczaniu się np. ze względu na ograniczoną sprawność.</p>

          <div class='faq-container' v-for="(faq_item, index) in faq" :key='index'>
            <div class='faq-container__item faq-container__item--q'>
              <h4 class='tx__main-color tx__semibold tx__16'>{{ faq_item.question }}</h4>
            </div>
            <div class='faq-container__item'>
              <p class='tx__16 tx__black' v-html='faq_item.answer'></p>
            </div>
          </div>

        </div>
        </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light form-container">
        
        
   <transition-group name="component-fade" mode="out-in">
          <div v-show='isSend' key="isSend">
           <div class='form-container__item'>
              <h2 class='tx__semibold tx__black tx__green tx__22'>
                <i class="el-icon-circle-check tx__28 form-container__icon"></i>
                Formularz wypełniono poprawnie
              </h2>
            </div>

            <div class='form-container__item form-container__item--last'>
              <p class='tx__18 tx__black tx__margin-medium-bottom'>
                <strong>Co teraz?</strong> W ciągu maksymalnie 24h (w dni robocze) dyspozytor potwierdzi telefonicznie Twój przejazd. 
              </p>

              <el-row class='back-button-container'>
                <el-button @click='isSend = false'>Powrót do formularza</el-button>
              </el-row>
            </div>
          </div>

          <div v-show='!isSend' key="isNotSend">

            <div class='form-container__item'>
              <h2 class='tx__semibold tx__black  tx__22'>
                <i class="el-icon-document-copy form-container__icon"></i>
                Formularz zamówienia przejazdu
              </h2>
            </div>

            <el-form :label-position="'top'" :model="form">
            <div class='form-container__item'>
                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Imię i nazwisko*</span>
                  <el-input class='tx__14' placeholder="Wpisz swoje imię i nazwisko" v-model="form.names"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Data urodzenia*</span>
                    <el-date-picker
                    @input='validateAge'
                      class='tx__14'
                      style='width: 100%'
                      value-format='yyyy/MM/dd'
                      v-model="form.birthdate"
                      :picker-options="pickerOptionsBirth"
                      type="date"
                      placeholder="Wybierz datę urodzenia">
                    </el-date-picker>

                    <transition name="component-fade" mode="out-in">
                      <span class='tx__14 tx__margin-small-top label-validation' v-show='form.age < 18'>Aby skorzystać z przejazdu musisz być osobą pełnoletnią.</span>
                   </transition>

                </el-form-item>

                <el-form-item>
                  <span slot="label" class='tx__black tx__14'>Numer telefonu*</span>
                  <el-input class='tx__14' placeholder="Wpisz swój numer telefonu" v-model="form.phonenumber"></el-input>
                </el-form-item>

                

                <el-form-item v-show='form.phonenumber'>
                  <span class='tx__black  tx__14' slot="label">Powtórz numer telefonu*</span>
                  <el-input class='tx__14' placeholder="Powtórz swój numer telefonu" v-model="phonenumber"></el-input>
                   <transition name="component-fade" mode="out-in">
                      <span class='tx__14 label-validation' v-show='form.phonenumber !== phonenumber && phonenumber'>Podane numery telefonu różnią się od siebie.</span>
                   </transition>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Czy posiadasz orzeczenie o niepełnosprawności?*</span>
                    <el-radio @input='form.reason = ""' v-model="form.ifdisabled" class='tx__14' label="Tak">Tak</el-radio>
                    <el-radio @input='form.disabilitylevel = ""' v-model="form.ifdisabled" class='tx__14' label="Nie">Nie</el-radio>
                </el-form-item>

                <el-form-item v-if='form.ifdisabled === "Tak"'>
                  <span class='tx__14 tx__black' slot="label">Stopień niepełnosprawności*</span>
                  <el-select style='width: 100%' v-model="form.disabilitylevel" placeholder="Wybierz stopień niepełnosprawności">
                    <el-option
                      class='tx__14'
                      label="Lekki"
                    
                      value="Lekki">
                    </el-option>
                    <el-option
                      class='tx__14'
                      label="Umiarkowany"
                      value="Umiarkowany">
                    </el-option>
                    <el-option
                      class='tx__14'
                      label="Znaczny"
                      value="Znaczny">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item v-if='form.ifdisabled === "Nie"'>
                  <span class='tx__14 tx__black' slot="label">Wymagam wsparcia w zakresie mobilności ze względu na ograniczoną sprawność w poruszaniu się z powodu*</span>
                  <el-select style='width: 100%' v-model="form.reason" placeholder="Wybierz powód">
                    <el-option
                      class='tx__14'
                      label="Stan zdrowia"
                      value="Stan zdrowia">
                    </el-option>
                    <el-option
                      class='tx__14'
                      label="Wiek"
                      value="Wiek">
                    </el-option>
                    <el-option
                      class='tx__14'
                      label="Inne"
                      value="Inne">
                    </el-option>
                    <el-option
                      class='tx__14'
                      label="Nie posiadam ograniczeń mobilnych"
                      value="Nie posiadam ograniczeń mobilnych">
                    </el-option>
                  </el-select>
                </el-form-item>

                <transition name="component-fade" mode="out-in">
                      <span class='label-validation tx__16 tx__extrabold tx__black tx__margin-small-top' v-show='form.reason == "Nie posiadam ograniczeń mobilnych"'>Usługa nie może być zrealizowana!</span>
              </transition>



              </div>
              <div class='form-container__item'>
                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Miejscowość odbioru*</span>
                  <el-select @input='postcode' class='tx__14' style='width: 100%' v-model="form.city" placeholder="Wybierz miejscowość odbioru">
                    <el-option
                      v-for="item in availableCities"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                 <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Ulica i numer lokalu/mieszkania odbioru*</span>
                  <el-input class='tx__14' placeholder="Wpisz ulicę i numer lokalu/mieszkania" v-model="form.street"></el-input>
                </el-form-item>

                 <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Kod pocztowy*</span>
                  <el-input class='tx__14' placeholder="Wpisz kod pocztowy swojej miejscowości" v-model="form.postcode"></el-input>
                </el-form-item>
              </div>

              <div class='form-container__item'>

                <h5 class='tx__main-color tx__16 tx__semibold'>Informacje o przejeździe</h5>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Data przejazdu*</span>
                    <el-date-picker
                      class='tx__14'
                      style='width: 100%'
                      value-format='yyyy/MM/dd'
                      v-model="form.startdate"
                      :picker-options="pickerOptions"
                      type="date"
                      placeholder="Wybierz datę przejazdu">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Godzina przejazdu*</span>
                    <el-time-select
                    class='tx__14'
                      style='width: 100%'
                      v-model="form.starthour"
                      :picker-options="{
                        start: '08:00',
                        step: '00:15',
                        end: '17:30'
                      }"
                      placeholder="Wybierz godzinę">
                    </el-time-select>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Miejscowość docelowa*</span>
                  <el-input class='tx__14' placeholder="Wpisz miejscowość docelową" v-model="form.destinationcity"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Kod pocztowy miejscowości docelowej*</span>
                  <el-input class='tx__14' placeholder="Wpisz kod pocztowy miejscowości docelowej" v-model="form.destinationpostcode"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Ulica i numer lokalu*</span>
                  <el-input class='tx__14' placeholder="Wpisz ulicę i numer lokalu" v-model="form.destinationstreet"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Nazwa (np. Urząd Pracy w Koszalinie)*</span>
                  <el-input class='tx__14' placeholder="Wpisz nazwę celu" v-model="form.destinationname"></el-input>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Czy potrzebujesz transportu powrotnego?*</span>
                    <el-radio v-model="form.ifround" class='tx__14' label="Tak">Tak</el-radio>
                    <el-radio v-model="form.ifround" class='tx__14' label="Nie">Nie</el-radio>
                </el-form-item>


                <el-form-item v-show='form.ifround == "Tak"'>
                  <span class='tx__14 tx__black' slot="label">Planowana godzina powrotu*</span>
                    <el-time-select
                    class='tx__14'
                      style='width: 100%'
                      v-model="form.neededtime"
                      :picker-options="{
                        start: '08:00',
                        step: '00:15',
                        end: '17:45'
                      }"
                      placeholder="Planowana godzina powrotu">
                    </el-time-select>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Realizacja usługi w celu:*</span>
                  <el-select style='width: 100%' v-model="form.purpose" placeholder="Wybierz cel realizacji przejazdu">
                    <el-option
                      class='tx__14'
                      v-for="item in availablePurposes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">


                     <span style="float: left">{{ item.label }}</span>
                        <span style="float: right"><el-popover
                        placement="right-start"
                        :title="item.label"
                        width="200"
                        trigger="hover"
                        :content="item.description">
                        <el-button style='padding: 2px 6px; font-size: 12px; border-radius: 100px;' slot="reference">?</el-button> 
                        </el-popover>
                        </span>
                  

                    </el-option>
                  </el-select>
                   
                 
                    
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Czy potrzebujesz wypożyczyć wózek inwalidzki?*</span>
                    <el-radio v-model="form.ifwheelchair" class='tx__14' label="Tak">Tak</el-radio>
                    <el-radio v-model="form.ifwheelchair" class='tx__14' label="Nie">Nie</el-radio>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Czy potrzebujesz przewieźć wózek inwalidzki?*</span>
                    <el-radio v-model="form.ifwheelchairincar" class='tx__14' label="Tak">Tak</el-radio>
                    <el-radio v-model="form.ifwheelchairincar" class='tx__14' label="Nie">Nie</el-radio>
                </el-form-item>

                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Czy potrzebujesz pomocy asystenta w dotarciu z mieszkania do pojazdu i z powrotem?*</span>
                    <el-radio v-model="form.ifhelp" class='tx__14' label="Tak">Tak</el-radio>
                    <el-radio v-model="form.ifhelp" class='tx__14' label="Nie">Nie</el-radio>
                </el-form-item>


                <el-form-item>
                  <span class='tx__14 tx__black' slot="label">Dodatkowe informacje (np. uwagi dla kierowcy)</span>
                  <el-input
                    class='tx__14'
                    type="textarea"
                    placeholder="Wpisz dodatkowe informacje"
                    v-model="form.additionalinfo"
                    maxlength="250"
                    show-word-limit
                  >
                  </el-input>
                </el-form-item>

              </div>

              <div class='form-container__item form-container__item--last'>
                  <el-checkbox class='tx__14 tx__black' v-model="form.checked">Akceptuję postanowienia <el-button type="text" class='tx__14 tx__black' @click="dialogVisible = true">regulaminu</el-button>.*</el-checkbox>
                  <el-checkbox class='tx__14 tx__black' v-model="form.checked2">Zapoznałem się z <a href='https://mopsmielno.bip.net.pl/?c=317' target="_blank">regulaminem oraz załącznikami</a>.*</el-checkbox>

                  
              <el-button @click.once='submitForm()' class='tx__14  button__big tx__white' :disabled='!validateForm' type="primary">POTWIERDŹ</el-button>
              
              <transition name="component-fade" mode="out-in">
                      <span class='label-validation tx__14 tx__black tx__margin-small-top' v-show='!validateForm'>Wypełnij wszystkie wymagane pola!</span>
              </transition>

 
              </div>
              </el-form> 

              </div>
              </transition-group>
              

              <el-dialog
                class='regulation-section'
                :visible.sync="dialogVisible"
                width="80%"
                >
                <h3 class='tx__semibold tx__black tx__22 tx__margin-medium'>REGULAMIN ŚWIADCZENIA USŁUG DOOR-TO-DOOR W GMINIE MIELNO</h3>
                <p class='regulation-section__section-sign tx__black tx__16'>§1</p>
                <ol class='regulation-section__list tx__black tx__16'>
                  <li class='regulation-section__list-item'>
                    Podejmując działania zmierzające do ograniczania skutków niepełnosprawności osób z terenu Gminy Mielno w zakresie barier transportowych i dążąc do ułatwienia im przemieszczania się, określa się regulamin organizacji i funkcjonowania przewozu osób niepełnosprawnych w formie door-to-door z terenu Gminy Mielno.
                  </li>
                </ol>
                
                <p class='regulation-section__section-sign tx__black tx__16'>§2</p>
                <ol class='regulation-section__list tx__black tx__16'>
                  Ilekroć w treści Zasad jest mowa o:
<li class='regulation-section__list-item'>Regulamin – rozumie się przez to „Regulamin świadczenia usługi door-to-door w Gminie Mielno”, </li>
<li class='regulation-section__list-item'>Osoby z potrzebą wsparcia w zakresie mobilności – osoby, które mają trudności w samodzielnym przemieszczaniu się np. ze względu na ograniczoną sprawność (w tym: poruszające się na wózkach inwalidzkich, poruszające się o kulach, niewidome, słabowidzące i inne). Są to zarówno osoby z potrzebą wsparcia w zakresie mobilności posiadające orzeczenie o stopniu niepełnosprawności (lub równoważne), jak i osoby nieposiadające takiego orzeczenia. </li>
<li class='regulation-section__list-item'>Usługa door-to-door – usługa indywidualnego transportu osoby z potrzebą wsparcia w zakresie mobilności, obejmująca pomoc w wydostaniu się z mieszkania lub innego miejsca, przejazd i pomoc w dotarciu do miejsca docelowego. Pojęcie indywidualnego transportu obejmuje również sytuacje, w których z transportu korzysta w tym samym czasie – o ile pozwalają na to warunki pojazdu - kilka osób uprawnionych, jadąc z jednej wspólnej lokalizacji do wspólnego miejsca docelowego albo jadąc z kilku lokalizacji do wspólnego miejsca docelowego i z powrotem. </li>
<li class='regulation-section__list-item'>Użytkownicy/użytkowniczki – osoby z potrzebą wsparcia w zakresie mobilności i korzystające z usług door-to-door, które ukończyły 18 rok życia. </li>
<li class='regulation-section__list-item'>Aktywizacja społeczno-zawodowa – rozwijanie aktywności w życiu publicznym, społecznym i zawodowym przez osoby z potrzebą wsparcia w zakresie mobilności poprzez niwelowanie barier związanych z mobilnością tych osób. Aktywizacja ma przyczynić się m.in. do zwiększenia szans rozwoju tych osób, udziału w edukacji, korzystania z infrastruktury społecznej i zwiększenia aktywności zawodowej. </li>
<li class='regulation-section__list-item'>Mieszkańcu – rozumie się przez to osobę zamieszkałą na terenie Gminy Mielno, </li>
<li class='regulation-section__list-item'>Zgłoszeniu – rozumie się przez to zamówienie usługi dokonane poprzez następujące kanały komunikacji: telefonicznie na wyznaczony do tego numer telefonu, poprzez email, poprzez stworzoną stronę internetową, za pomocą SMS oraz osobiście w biurze projektu, </li>
<li class='regulation-section__list-item'>Przewozie – rozumie się przez to usługę przewozu osób, </li>
<li class='regulation-section__list-item'>Pojeździe – rozumie się przez to pojazd przeznaczony do przewozu osób, </li>
<li class='regulation-section__list-item'>Kursie – rozumie się przez to przejazd z miejsca podstawienia pojazdu do miejsca docelowego wyznaczonego przez pasażera bądź jego opiekuna. </li>
                </ol>

                <p class='regulation-section__section-sign tx__black tx__16'>§3</p> 
                <ol class='regulation-section__list tx__black tx__16'>
                <li class='regulation-section__list-item'>Usługa jest dostępna dla pełnoletnich osób będących mieszkańcami z potrzebą wsparcia w zakresie mobilności.</li>
<li class='regulation-section__list-item'>Realizacja usługi służy wsparciu realizacji aktywnej integracji, do której należą usługi o charakterze:
  <ol class='regulation-section__list--nested' type="a">
<li class='regulation-section__list-item'>społecznym, których celem jest nabycie, przywrócenie lub wzmocnienie kompetencji społecznych, zaradności, samodzielności i aktywności społecznej, m.in. poprzez udział w zajęciach w Centrum Integracji Społecznej (CIS), Klubie Integracji Społecznej (KIS) lub Warsztatach Terapii Zajęciowej (WTZ); </li>
<li class='regulation-section__list-item'>zawodowym, których celem jest pomoc w podjęciu decyzji dotyczącej wyboru lub zmiany zawodu, wyposażenie w kompetencje i kwalifikacje zawodowe oraz umiejętności pożądane na rynku pracy (poprzez m.in. udział w zajęciach w CIS, KIS lub WTZ, kursy i szkolenia zawodowe), pomoc w utrzymaniu zatrudnienia;</li>
<li class='regulation-section__list-item'>edukacyjnym, których celem jest wzrost poziomu wykształcenia, dostosowanie wykształcenia do potrzeb rynku pracy (m.in. edukacja formalna);</li>
<li class='regulation-section__list-item'>zdrowotnym, których celem jest wyeliminowanie lub złagodzenie barier zdrowotnych utrudniających funkcjonowanie w społeczeństwie lub powodujących oddalenie od rynku pracy</li>
   </ol>
   </li>
<li class='regulation-section__list-item'>Świadczenie usługi jest nieodpłatne.</li>
<li class='regulation-section__list-item'>Przewozy świadczone są najkrótszą trasą. Przewoźnik ma prawo do łączenia kursów w celu maksymalnego wykorzystania przebiegu środka transportu.</li>
<li class='regulation-section__list-item'>Zgłoszenie chęci skorzystania z usługi możliwe jest tylko przez osobę, która ukończyła 18 lat.</li>
<li class='regulation-section__list-item'>Usługa dostępna jest w dni robocze od godziny 8.00 do godziny 18.00.</li>
<li class='regulation-section__list-item'>Zgłoszenia na przewozy przyjmowane są w dni powszednie w godzinach: od 7:00 do 14:00. W zgłoszeniu należy podać: - dane osobowe osoby zgłaszającej oraz pasażera, adres zamieszkania, numer telefonu; - datę i godzinę wykonania przewozu; - miejsce podstawienia pojazdu i miejsce docelowe, charakter realizacji usługi oraz ewentualnie trasę przejazdu.</li>
<li class='regulation-section__list-item'>Świadczenie usługi door to door nie jest usługą o charakterze transportu medycznego ani transportu sanitarnego.</li>
<li class='regulation-section__list-item'>Użytkownicy/użytkowniczki mają prawo do korzystania z bezpłatnej pomocy ze strony przewoźnika, tj. przy wsiadaniu i wysiadaniu z pojazdu oraz przemieszczaniu się z budynku do pojazdu i z pojazdu do budynku (miejsca docelowego).</li>
<li class='regulation-section__list-item'>Czas oczekiwania na potwierdzenie przyjęcia zamówienia na realizację usługi nie przekroczy 24 godzin.</li>
<li class='regulation-section__list-item'>Maksymalny czas oczekiwania od potwierdzenia zamówienia do rozpoczęcia realizacji usługi nie będzie przekraczać 3 dni roboczych.</li>
<li class='regulation-section__list-item'>Zamawiający usługę otrzyma informację o maksymalnym czasie oczekiwania pojazdu przed budynkiem, w którym przebywa użytkownik/użytkowniczka oczekujący/oczekująca na przejazd. Czas oczekiwania pojazdu nie będzie dłuższy niż 15 minut.</li>
<li class='regulation-section__list-item'>Przewiduje się możliwość odwołania lub rezygnacji z usługi transportowej door-to-door, jednak nie później niż do momentu, gdy pojazd zostanie podstawiony w umówione miejsce.</li>
<li class='regulation-section__list-item'>W każdym przypadku o przyjęciu zgłoszenia decyduje kolejność zgłoszeń. Osoby aktywne zawodowo mają pierwszeństwo przejazdu do i z miejsca pracy.</li>
<li class='regulation-section__list-item'>W razie braku możliwości zrealizowania usługi transportowej door-to-door zgodnie z zamówieniem (np. ze względu na zbyt dużą liczbę zamówień, ograniczenia taboru przewozowego lub ograniczenia kadrowe), użytkownik/użytkowniczka otrzyma niezwłocznie na podane dane kontaktowe, informację o braku możliwości zrealizowania usługi w zamówionym terminie.</li>
<li class='regulation-section__list-item'>Użytkownicy/użytkowniczki zobowiązani są do stosowania obowiązujących w danych czasie obostrzeń sanitarnych.</li>
<li class='regulation-section__list-item'>W przypadku bezzasadnego zamówienia usługi bądź rezygnacji po przybyciu pojazdu użytkownik/użytkowniczka może zostać obciążona jednorazowym kosztem w wysokości 20,00 zł.</li>
</ol>

<p class='regulation-section__section-sign tx__black tx__16'>§4</p>
<ol class='regulation-section__list tx__black tx__16'><li class='regulation-section__list-item'>Niniejsze Regulamin zamieszcza się na stronie internetowej BIP Gminy Mielno oraz Miejskiego Ośrodka Pomocy Społecznej w Mielnie.</li></ol>
                  
                  <span slot="footer" class="dialog-footer">
                  
                  <el-button type="primary" @click="dialogVisible = false">Zamknij</el-button>
                </span>
              </el-dialog>
   
        </div>
      </el-col>
      </div>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="footer-content">

            <div class="footer-content__element">
              <a href='#'><img class='footer-content__logo' src='../assets/logo_PFRON.jpg' alt=''></a>
            </div>

          </div>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>


import db from '../firestore'
import axios from 'axios'
import VueAxios from 'vue-axios'
import emailjs from 'emailjs-com'

export default {
  name: 'Home', 
  data() {
    return {
      increaseValue: 0,
      dialogVisible: false,
      pickerOptions: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          
          var sunday = new Date(time).getDay() === 0; 
          var saturday = new Date(time).getDay() === 6; 
          var today = new Date();
          return sunday + saturday + (time < (new Date().setDate(new Date().getDate())));
          
        }
      },
      pickerOptionsBirth: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          
         
          return (time > (new Date().setDate(new Date().getDate() - 0)));
          
        }
      },
      isSend: false,
      phonenumber: '',
      form: {
        status : 'toconfirm',
        names: '',
        birthdate: '',
        age: '',
        phonenumber: '',
        ifdisabled: '',
        disabilitylevel: '',
        reason: '',
        city: '',
        street: '',
        postcode: '',
        startdate: '',
        starthour: '',
        destinationcity: '',
        destinationpostcode: '',
        destinationstreet: '',
        destinationname: '',
        ifround: '',
        neededtime: '',
        ifwheelchair: '',
        ifwheelchairincar: '',
        ifhelp: '',
        additionalinfo: '',
        checked: '',
        checked2: '',
        purpose: ''
      },
      faq: [
        {
          question: "Kiedy realizowane są przejazdy?",
          answer: "Przejazdy realizowane są w dni robocze od godziny 6.00 do godziny 18.00."
        },
        {
          question: "Czy muszę posiadać orzeczenie o niepełnosprawności?",
          answer: "Do skorzystania z usługi NIE POTRZEBUJESZ orzeczenia o niepełnosprawności."
        },
        {
          question: "Jakie wymagania muszę spełniać, by skorzystać z przejazdu?",
          answer: "Jedynym wymaganiem jest to, że musisz być PEŁNOLETNIĄ osobą o ograniczonej mobilności mieszkającą na terenie GMINY MIELNO."
        },
        {
          question: "Czy mogę liczyć na dodatkową pomoc?",
          answer: "Użytkownicy mogą liczyć na pomoc m.in. przy wsiadaniu, wysiadaniu oraz poruszaniu się po budynku w miejscu docelowym. Jesteśmy po to, aby Tobie pomóc! :)"
        },
        {
          question: "Czy poniosę jakieś opłaty?",
          answer: "Usluga jest <strong>CAŁKOWICIE BEZPŁATNA.</strong> Nie musisz martwić się żadnymi kosztami związanymi z przewozem."
        },
        {
          question: "Kto jest realizatorem przejazdów?",
          answer: "Realizatorem przejazdów jest Miejski Ośrodek Pomocy Społecznej w Mielnie"
        },
        {
          question: "Kiedy muszę złożyć zamówienie na przejazd?",
          answer: "Zamówienie na przejazd powinno zostać złożone co najmniej 3 dni przed planowanym przejazdem."
        },
        {
          question: "Jak długo czeka się na potwierdzenie?",
          answer: "Potwierdzenie przyjęcia zamówienia otrzymasz po 24h (roboczych)."
        },
         {
          question: "Kontakt",
          answer: "Jeżeli masz pytania lub wątpliwości w trakcie wypełniania zgłoszenia zadzwoń pod numer 518-900-101 w godzinach od 7.00 do 14.00."
        }
        ,
         {
          question: "Cel programu",
          answer: "Celem głównym projektu jest zapobieganie zjawisku wykluczenia społecznego i zawodowego poprzez wsparcie w zakresie mobilności pełnoletnich mieszkańców Gminy Mielno oraz poprawa dostępności do wielorodzinnych budynków mieszkalnych w gminie w latach 2020-2022."
        },
         {
          question: "Planowane efekty",
          answer: "Planowane efekty: Liczba jednostek samorządu terytorialnego, które oferują usługę indywidualnego transportu door-to-door dla osób o ograniczonej mobilności dzięki wsparciu EFS - 1; liczba jednostek samorządu terytorialnego, które oferują usługę indywidualnego transportu door-to-door dla osób o ograniczonej mobilności po zakończeniu udziału w projekcie - 1; liczba użytkowników/użytkowniczek usług door-to-door, objęta wsparciem w projekcie grantowym (ogółem), w tym liczba osób potrzebujących pomocy/asysty - 119 osób (w tym 72 potrzebujących asysty); liczba użytkowników/użytkowniczek usług door-to-door, objęta wsparciem w projekcie grantowym (ogółem), realizująca cel społeczny lub zawodowy. Liczba użytkowników realizujących cel zawodowy: 10, cel społeczny: 40."
        } ,
         {
          question: "Finansowanie projektu",
          answer: "Dofinansowanie projektu z funduszy EU wynosi 460357,59 zł."
        }
      ],
      availablePurposes: [
        {
          value: 'Społecznym',
          label: 'Społecznym',
          description: 'Których celem jest nabycie, przywrócenie lub wzmocnienie kompetencji społecznych, zaradności, samodzielności i aktywności społecznej, m.in. poprzez udział w zajęciach w Centrum Integracji Społecznej (CIS), Klubie Integracji Społecznej (KIS) lub Warsztacie Terapii Zajęciowej (WTZ).'
        },
        {
          value: 'Zawodowym',
          label: 'Zawodowym',
          description: 'Których celem jest pomoc w utrzymaniu zatrudnienia, podjęciu decyzji dotyczącej wyboru lub zmiany zawodu, wyposażenie w kompetencje i kwalifikacje zawodowe oraz umiejętności pożądane na rynku pracy.'
        },
        {
          value: 'Edukacyjnym',
          label: 'Edukacyjnym',
          description: 'Których celem jest wzrost poziomu wykształcenia, dostosowanie wykształcenia do potrzeb rynku pracy (m.in. edukacja formalna).'
        },
        {
          value: 'Zdrowotnym',
          label: 'Zdrowotnym',
          description: 'Których celem jest wyeliminowanie lub złagodzenie barier zdrowotnych utrudniających funkcjonowanie w społeczeństwie lub powodujących oddalenie od rynku pracy.'
        },
      ],
      availableCities: [
        {
          value: 'Mielno',
          label: 'Mielno'
        }, {
          value: 'Mielenko',
          label: 'Mielenko'
        }, {
          value: 'Łazy',
          label: 'Łazy'
        }, {
          value: 'Komorniki',
          label: 'Komorniki'
        }, {
          value: 'Chłopy',
          label: 'Chłopy'
        }, {
          value: 'Gąski',
          label: 'Gąski'
        }, {
          value: 'Sarbinowo',
          label: 'Sarbinowo'
        }, {
          value: 'Niegoszcz',
          label: 'Niegoszcz'
        }, {
          value: 'Paprotno',
          label: 'Paprotno'
        }, {
          value: 'Pękalin',
          label: 'Pękalin'
        }, {
          value: 'Radzichowo',
          label: 'Radzichowo'
        }],
      
    }
  },



  methods: {

    deleteContrast() {

      document.querySelectorAll(`[style].tx__main-color, .tx__black, .el-radio__label, .tx__white, .navbar-content, .button__blue-border,
      .tx__main-color--navbar,
      .main-container, .faq-container, .form-container,
      .faq-container, .form-container,
      .faq-container__item, .form-container__item,
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,
      .el-radio__input:hover,
      .el-checkbox__input.is-checked+.el-checkbox__label,
      .el-button--primary.is-disabled
      `)
      .forEach(el => el.removeAttribute('style'));

    },

    contrast() {

      document.querySelectorAll('.tx__main-color, .tx__black, .el-radio__label').forEach(element => {
        element.style.color = '#FFFF00'
      })

      document.querySelectorAll('.tx__white').forEach(element => {
        element.style.color = 'black'
      })

      document.querySelectorAll('.navbar-content').forEach(element => {
        element.style.background = '#FFFF00'
      })

      document.querySelectorAll('.button__blue-border').forEach(element => {
        element.style['border-color'] = 'black'
        element.style['background'] = 'white'
      })

      document.querySelectorAll('.tx__main-color--navbar').forEach(element => {
        element.style.color = 'black'
      })

      document.querySelectorAll('.main-container, .faq-container, .form-container').forEach(element => {
        element.style.background = 'black'
      })

      document.querySelectorAll('.faq-container, .form-container').forEach(element => {
        element.style.border = '1px solid #FFFF00'
      })

      document.querySelectorAll('.faq-container__item, .form-container__item').forEach(element => {
        element.style['border-bottom'] = '1px solid #FFFF00'
      })

      document.querySelectorAll('.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner').forEach(element => {
        element.style['border-color'] = '#FFFF00'
        element.style['background-color'] = '#FFFF00'
      })

      document.querySelectorAll('.el-radio__input:hover').forEach(element => {
        element.style['border-color'] = '#FFFF00'
      })

      document.querySelectorAll('.el-checkbox__input.is-checked+.el-checkbox__label').forEach(element => {
        element.style['color'] = '#FFFF00'
      })

      document.querySelectorAll('.el-button--primary.is-disabled').forEach(element => {
        element.style['background-color'] = 'rgba(255, 255, 0, 0.5)'
        element.style['border-color'] = 'rgba(255, 255, 0, 0)'
      })


      

    },



    decreaseFont() {

      

      console.log(this.increaseValue)

      if(this.increaseValue > -1) {
        this.increaseValue = this.increaseValue - 1;
        document.querySelectorAll(".el-input__inner, .el-checkbox__label, .el-radio__label, .tx__14, .tx__16, .tx__18, .tx__20, .tx__22, .tx__28, .tx__72, .tx__142").forEach(element => {

          element.style.fontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size')) - 4 + 'px'
        
      })}

    },

    increaseFont() {

      

      console.log(this.increaseValue)

      if(this.increaseValue < 2) {
        this.increaseValue = this.increaseValue + 1;
        document.querySelectorAll(".el-input__inner, .el-checkbox__label, .el-radio__label, .tx__14, .tx__16, .tx__18, .tx__20, .tx__22, .tx__28, .tx__72, .tx__142").forEach(element => {

            element.style.fontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size')) + 4 + 'px'
          
      })}



    },

    sendEmail() {

      var templateParams = {
        name: this.form.names,
        date: this.form.startdate,
        time: this.form.starthour
      }


       emailjs.send('service_vgo580f', 'template_vk0hba4', templateParams, "user_H0h2RHM8jXbRlBnbp3dg4")
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });


        


    },

    submitForm() {

      

          db.collection('submited').add(
                                {...this.form,
                            
                                timestamp : Date.now()
                                }
                                ).then(() => {

                                  this.sendSMS()
                                  this.sendEmail()

                                  

                                    this.isSend = true;

                                    this.form.names = ''
                                    this.form.phonenumber = ''
                                    this.form.ifdisabled = '',
                                    this.form.disabilitylevel = '',
                                    this.form.reason = '',
                                    this.form.city = ''
                                    this.form.street = ''
                                    this.form.postcode = ''
                                    this.form.startdate = ''
                                    this.form.starthour = ''
                                    this.form.destinationcity = ''
                                    this.form.destinationpostcode = ''
                                    this.form.destinationstreet = ''
                                    this.form.destinationname = ''
                                    this.form.ifround = ''
                                    this.form.purpose = ''
                                    this.form.checked = ''
                                    this.form.phonenumber = ''
                                    this.form.phonenumber = ''
                                    this.form.additionalinfo = ''
                                    this.form.ifwheelchair = ''
                                    this.form.ifhelp = ''
                                    this.form.ifwheelchairincar = ''
                                    this.form.purpose = ''
                                    this.form.neededtime = ''

                                    window.scrollTo(0,0);
                                  

                                })                    

    },

    sendSMS() {

       var module = require('serwersms.pl');

        try{

            var object = module.serwerSMS('webapi_przejazdymielno','ccafc8af');

            var messages = object.oMessages;

            // SMS FULL

            var params = new Object();

            params.phone  = ['518900101'];
            params.text   = 'Nowe zgłoszenie w systemie PRZEJAZDY MIELNO od ' + this.form.names + ' na dzień ' + this.form.startdate + ' godz. ' + this.form.starthour + '.';
            params.sender = 'INFORMACJA'; 
            params.details = true;
            params.test = false;

            var callback = function(data){

                var obj = JSON.parse(data);
                console.log(obj);
            }
            messages.sendSms(params,callback);

        
     
    }catch(err) {
            console.log(err.message);
        }
    }

  },

  created() {



  },

  computed: {

    validateAge() {

        var today = new Date();
        var birthDate = new Date(this.form.birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        
        console.log(age)
        this.form.age = age;
        console.log(this.form.age)
        return age;

    },

    validateForm() {

      if(this.form.names 
      && this.form.phonenumber
      && this.form.ifdisabled
      && this.form.birthdate
      && this.form.age >= 18
      && this.form.city
      && this.form.street 
      && this.form.postcode
      && this.form.startdate
      && this.form.starthour
      && this.form.destinationcity
      && this.form.destinationpostcode 
      && this.form.destinationstreet
      && this.form.destinationname
      && this.form.ifwheelchair
      && this.form.ifwheelchairincar
      && this.form.ifhelp
      && this.form.ifround
      && this.form.purpose
      && this.form.checked
      && this.form.checked2
      && this.form.phonenumber == this.phonenumber
      ) {

        if((this.form.ifdisabled == 'Tak' && this.form.disabilitylevel) || (this.form.ifdisabled == 'Nie' && this.form.reason && this.form.reason !== 'Nie posiadam ograniczeń mobilnych')) {

          return true

        } 
        // else if (this.form.ifdisabled == 'Nie') {

        //   if(this.form.reason != 'Nie posiadam ograniczeń mobilnych') {

        //       return true

        //     } else {

        //       return false
        //     }
        //   }
        
      } else {
        return false
      }


      

    },

    postcode() {
          
          switch(this.form.city) {
          case 'Mielno':
            this.form.postcode = '76-032'
            break;
          case 'Mielenko':
            this.form.postcode = '76-032'
            break;
          case 'Chłopy':
            this.form.postcode = '76-034'
            break;
          case 'Sarbinowo':
            this.form.postcode = '76-034'
            break;
          case 'Gąski':
            this.form.postcode = '76-034'
            break;
          case 'Komorniki':
            this.form.postcode = '76-032'
            break;
          case 'Niegoszcz':
            this.form.postcode = '76-032'
            break;
          case 'Paprotno':
            this.form.postcode = '76-034'
            break;
          case 'Pękalin':
            this.form.postcode = '76-034'
            break;
          case 'Radzichowo':
            this.form.postcode = '76-032'
            break;
          case 'Łazy':
            this.form.postcode = '76-002'
            break;
          default:
            this.form.postcode = ''
        }
    }

  }
}
</script>

<style lang="scss">

.back-button-container {
    display: flex;
    justify-content: center;
}

.tx {
  &__main-color {
    color: #00008B;
  }

  &__main-color--navbar {
    color: #00008B;
  }

  &__black {
    color: black;
  }

  &__white {
    color: white;
  }

  &__yellow {
    color: #FFFF00;
  }

  &__green {
    color: green;
  }

  &__semibold {
    font-weight: 600;
  }

  &__extrabold {
    font-weight: 700;
  }

  &__14 {
    font-size: 14px;
  }

  &__16 {
    font-size: 16px;
    line-height: 26px;
  }

  &__18 {
    font-size: 18px;
    line-height: 30px;
  }

  &__20 {
    font-size: 20px;
  }

  &__22 {
    font-size: 22px;
  }

  &__28 {
    font-size: 28px;
  }

  &__72 {
    font-size: 72px;
  }

  &__142 {
    font-size: 142px;
  }

  &__margin-small {
    margin: 20px 0;
  }

   &__margin-small--bottom {
    margin: 0 0 20px 0;
  }

  &__margin-medium {
    margin: 30px 0 30px 0;
  }

  &__margin-medium-bottom {
    margin: 0px 0 30px 0;
  }

  &__margin-small-top {
    margin: 10px 0 0;
  }
}


.main-header {
  font-size: 96px; 
  max-width: 1120px;
  width: 100%;
}

.button {



  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    opacity: 0.7;
  }

  &__big {
    width: 100%;
  }

  &__no-border {
    border: none;
  }

  &__blue-border {
    border: 2px solid #00008B;
  }

  &__black-border {
    border: 2px solid #000000;
  }

  &__black {
    background-color: black;
  }

  &__transparent {
    background-color: transparent;
  }

  &__small-margin {
    margin: 5px
  }
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.navbar-content {
  min-height: 100px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  &__logo {
    height: 80px;
  }

  &__element {
    margin: 10px 30px;
    min-height: 52px;
  }
}

.main-container {
  padding: 50px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.sub-container {

  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;

}

.label-validation {
  line-height: 20px;
    font-size: 14px;
    padding-left: 5px !important;
    color: red;
    display: inline-block;
}


.el-col-12 {
  min-width: 400px;
  max-width: 600px;
  padding: 40px;
}

.faq-container {
  background-color: white;
  border: 1px solid #00008B;
  margin: 20px 0;
  border-radius: 2px;

  &__item{

    padding: 15px;

    &--q {
      border-bottom: 1px solid #00008B;
    }
  }

  &__header {
    font-weight: 600;
  }
}

.form-container {
  background-color: white;
  border: 1px solid #00008B;

  margin: 20px 0;
  border-radius: 2px;

  &__icon {
    margin-right: 15px;
  }

  &__item {
    padding: 25px;
    border-bottom: 1px solid #00008B;

    &--last {
        border-bottom: 0px;
    }

  }


}

.el-form-item__label {
  line-height: 20px;
  font-size: 14px;
  padding-left: 5px !important;

}

.el-checkbox__label {
  margin-bottom: 22px;
}

.el-form-item {
  margin-top: 22px;
}

.el-button--primary {
    background-color:  #00008B;
    border-color:  #00008B;
}

.footer-content {
  min-height: 100px;
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  &__logo {
    height: 80px;
  }

  &__element {
    margin: 10px 30px;
    min-height: 52px;
  }

}

.regulation-section {
  // line-height: 20px;
  padding: 20px;

  &__list {
    margin-bottom: 20px;

    &--nested {
      margin-left: 20px;
    }
  }

  &__list-item {
    margin-bottom: 10px;
  }

  &__section-sign {
    text-align: center;
    font-weight: 600;
  }
}

.el-dialog__body {
  padding: 40px;
}

@media (max-width: 1200px) { 
  .main-header {
  font-size: 72px; 
  width: initial;
}

  .main-container {
  padding: 20px;
  }

  .el-col-12 {
  padding: 20px;
  width: 100%;
}
 }

@media (max-width: 800px) { 

  .main-header {
  font-size: 36px; 
}


  
  .navbar-content {
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  &__logo {
    height: 50px;
  }
} 
}

</style>

<style>

/* NAVBAR */


/* MAIN CONTAINR */

.main-container {
  background-color: #E5E5E5;
}

</style>