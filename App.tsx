import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Translator, {TranslatorProvider} from 'react-native-translator';

const Container = styled.View``;

const TranslateContainer = styled.View`
  background-color: lightgray;
  width: 45%;
  height: 300px;
  margin-right: 2.5%;
  border-radius: 5px;
  padding: 10px;
`;

const TranslatedTextView = styled.View`
  background-color: lightgray;
  width: 45%;
  height: 300px;
  margin-left: 2.5%;
  border-radius: 5px;
  padding: 10px;
`;

const TranslateView = styled.View`
  flex-direction: row;
  margin-top: 60%;
  margin-left: 5%;
`;

const StyledTranslator = styled(View)`
  background-color: lightgray;
`;

const LanguageSelector = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalView = styled.View`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalOption = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

// 번역버튼을 함수로 만들어서 components 생성합니다.
const LanguageButton = ({onPress, language}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LanguageSelector>
        <Text>{language}</Text>
        <Text style={{marginLeft: 5}}>▼</Text>
      </LanguageSelector>
    </TouchableOpacity>
  );
};

export default function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [fromLang, setFromLang] = useState('한국어');
  const [toLang, setToLang] = useState('영어');
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showTranslatorModal, setShowTranslatorModal] = useState(false);
  const [translator, setTranslator] = useState('google');

  const languageMapping = {
    한국어: 'ko',
    영어: 'en',
    일본어: 'ja',
    '중국어(간체)': 'zh-CN',
    '중국어(번체)': 'zh-TW',
    러시아어: 'ru',
    프랑스어: 'fr',
    스페인어: 'es',
    독일어: 'de',
    이탈리아어: 'it',
    태국어: 'th',
    베트남어: 'vi',
    인도네시아어: 'id',
  };

  // 카카오 번역일 경우에만 예외 언어코드를 설정해줬습니다.
  const getLanguage = (language, translatorType) => {
    const code = languageMapping[language];
    if (translatorType === 'kakao') {
      if (code === 'ko') return 'kr';
      if (code === 'ja') return 'jp';
      if (code === 'zh-CN' || code === 'zh-TW') return 'cn';
    }
    return code;
  };

  //Object.keys 함수는 위애ㅔ서 생성한 랭귀지매핑의 형태를 array 형태로 바꿔줍니다.
  const languages = Object.keys(languageMapping);
  const translators = ['google', 'papago', 'kakao'];

  return (
    <Container>
      <TranslateView>
        <TranslateContainer>
          <LanguageButton
            language={fromLang}
            onPress={() => setShowFromModal(true)}
          />
          <Text>{fromLang}</Text>
          <StyledTranslator>
            <Translator
              from={getLanguage(fromLang, translator)}
              to={getLanguage(toLang, translator)}
              value={value}
              onTranslated={t => setResult(t)}
              type={translator}
            />
          </StyledTranslator>
          <TextInput
            value={value}
            onChangeText={t => setValue(t)}
            placeholder="번역할 텍스트 입력"
          />
        </TranslateContainer>
        <TranslatedTextView>
          <LanguageButton
            language={toLang}
            onPress={() => setShowToModal(true)}
          />
          <Text>{toLang}</Text>
          <Text>{result}</Text>
        </TranslatedTextView>
      </TranslateView>
      <TouchableOpacity onPress={() => setShowTranslatorModal(true)}>
        <Text>번역기 선택: {translator}</Text>
      </TouchableOpacity>
      <Modal visible={showFromModal} transparent={true} animationType="slide">
        <ModalView>
          {languages.map(lang => (
            <ModalOption
              key={lang}
              onPress={() => {
                setFromLang(lang);
                setShowFromModal(false);
              }}>
              <Text>{lang}</Text>
            </ModalOption>
          ))}
        </ModalView>
      </Modal>
      <Modal visible={showToModal} transparent={true} animationType="slide">
        <ModalView>
          {languages.map(lang => (
            <ModalOption
              key={lang}
              onPress={() => {
                setToLang(lang);
                setShowToModal(false);
              }}>
              <Text>{lang}</Text>
            </ModalOption>
          ))}
        </ModalView>
      </Modal>
      <Modal
        visible={showTranslatorModal}
        transparent={true}
        animationType="slide">
        <ModalView>
          {translators.map(tran => (
            <ModalOption
              key={tran}
              onPress={() => {
                setTranslator(tran);
                setShowTranslatorModal(false);
              }}>
              <Text>{tran}</Text>
            </ModalOption>
          ))}
        </ModalView>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
