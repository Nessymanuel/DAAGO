import * as React from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import ModalMessage from '../components/ModalMessage';
import BackButton from '../components/BackButton';
import { useAuth } from '../store/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1,'Nome é obrigatório'),
  phone: z.string().min(1,'Telefone é obrigatório'),
  email: z.string().min(1,'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(6,'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6,'Confirme a senha'),
  terms: z.boolean()
}).refine(d => d.password === d.confirmPassword,{message:'Senhas não conferem',path:['confirmPassword']})
  .refine(d => d.terms === true,{message:'Você deve aceitar os Termos',path:['terms']});

type FormData = z.infer<typeof schema>;

const SignUpScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues:{terms:false} });
  const [modalVisible,setModalVisible] = React.useState(false);
  const [modalMessage,setModalMessage] = React.useState('');
  const auth = useAuth();

  const onSubmit = async (data: FormData) => {
    const res = await auth.signUp(data.name,data.email,data.password);
    if(!res.ok){ setModalMessage(res.message ?? 'Erro no cadastro'); setModalVisible(true); return; }
    navigation?.navigate?.('Dashboard');
  };
  const onError = (errors:any) => { const first = errors && Object.values(errors)[0]; setModalMessage(first?.message ?? 'Verifique os campos'); setModalVisible(true); };

  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:'#F3F4F6'}} behavior={Platform.OS==='ios'?'padding':undefined}>
      <ScrollView contentContainerStyle={{padding:24,flexGrow:1,justifyContent:'center'}} keyboardShouldPersistTaps="handled">

         <BackButton onPress={()=>navigation?.goBack?.()} style={styles.back}/>
        <View style={styles.inner}>
          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para criar sua conta.</Text>

          <Controller control={control} name="name" render={({field:{onChange,value}})=><Input label="Nome Completo" value={value} onChangeText={onChange}/>} />
          <Controller control={control} name="phone" render={({field:{onChange,value}})=><Input label="Telefone" value={value} onChangeText={onChange} keyboardType="phone-pad"/>} />
          <Controller control={control} name="email" render={({field:{onChange,value}})=><Input label="E-mail" value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none"/>} />
          <Controller control={control} name="password" render={({field:{onChange,value}})=><Input label="Senha" value={value} onChangeText={onChange} secureTextEntry/>} />
          <Controller control={control} name="confirmPassword" render={({field:{onChange,value}})=><Input label="Confirmar Senha" value={value} onChangeText={onChange} secureTextEntry/>} />

          <Controller control={control} name="terms" render={({field:{value}})=>(
            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={()=>setValue('terms',!value)} style={[styles.checkbox,{backgroundColor:value?'#2563EB':'#fff'}]}/>
              <Text style={styles.termsText}>Eu concordo com os Termos e Política de Privacidade</Text>
            </View>
          )} />

          <Button title="Criar conta" onPress={handleSubmit(onSubmit,onError)} style={styles.mb3} />
        </View>

        <ModalMessage visible={modalVisible} title="Erro" message={modalMessage || '!!input inválido'} onClose={()=>setModalVisible(false)}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  inner:{marginTop:24},
  title:{fontSize:28,fontWeight:'800',color:'#2563EB',marginBottom:8},
  subtitle:{color:'#475569',marginBottom:24},
  // back:{position:'absolute',top:60,left:18},
   back:{marginTop:32},
  termsContainer:{flexDirection:'row',alignItems:'center',marginVertical:12,},
  checkbox:{width:20,height:20,borderWidth:1,borderColor:'#CBD5E1',marginRight:8,borderRadius:4},
  termsText:{color:'#475569',flexShrink:1},
  mb3: { marginBottom: 12, backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 10 },
});
