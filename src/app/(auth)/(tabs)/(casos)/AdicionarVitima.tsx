import { View } from "react-native";
import { Text } from "react-native-paper";

export default function AdicionarVitima(){
    return (
        <View>
            <Text>Adicionar vitima tela, modifique a tela aqui Ket</Text>
            <Text>Arquivo (casos)/AdicionarVitima.tsx</Text>
        </View>
    )
}


{/* <Text style={styles.label}>Vítima *</Text>
        <TouchableOpacity style={styles.victimContainer} onPress={() => setModalVisible(true)}>
          {caso.vitima ? (
            <Text style={styles.victimTextActive}>{caso.vitima.nome}</Text>
          ) : (
            <Text style={styles.victimText}>Clique para adicionar vítima</Text>
          )}
          <Feather name="user-plus" size={20} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fileButton} onPress={handleFilePicker}>
          <Text style={styles.fileText}>
            {caso.anexos ? getFileName(caso.anexos) : 'Anexar arquivos (opcional)'}
          </Text>
        </TouchableOpacity> */}



/* 
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.title}>Cadastrar Vítima</Text>

          <Text style={styles.label}>CIN *</Text>
          <TextInput
            style={styles.input}
            value={vitima.cin}
            onChangeText={(text) => handleVitimaChange('cin', text)}
            placeholder="Número CIN"
          />

          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={vitima.nome}
            onChangeText={(text) => handleVitimaChange('nome', text)}
            placeholder="Nome da vítima"
          />

          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={vitima.genero}
            onChangeText={(text) => handleVitimaChange('genero', text)}
            placeholder="Gênero"
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={vitima.idade}
            onChangeText={(text) => handleVitimaChange('idade', text)}
            placeholder="Idade"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Documento</Text>
          <TextInput
            style={styles.input}
            value={vitima.documento}
            onChangeText={(text) => handleVitimaChange('documento', text)}
            placeholder="Documento de identificação"
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={vitima.endereco}
            onChangeText={(text) => handleVitimaChange('endereco', text)}
            placeholder="Endereço"
          />

          <Text style={styles.label}>Cor</Text>
          <TextInput
            style={styles.input}
            value={vitima.cor}
            onChangeText={(text) => handleVitimaChange('cor', text)}
            placeholder="Cor"
          />

          <Text style={styles.label}>Odontograma</Text>
          {regioes.map((regiao) => (
            <View key={regiao} style={styles.odontogramaRegion}>
              <Text style={styles.odontogramaTitle}>{nomesRegioes[regiao]}</Text>
              {vitima.odontograma[regiao].map((item, index) => (
                <View key={index} style={styles.odontogramaItemContainer}>
                  <TextInput
                    style={styles.odontogramaInput}
                    value={item}
                    onChangeText={(text) => handleOdontogramaChange(regiao, index, text)}
                    placeholder="Detalhe"
                  />
                  <TouchableOpacity
                    onPress={() => removeOdontogramaItem(regiao, index)}
                    disabled={vitima.odontograma[regiao].length === 1}
                    style={{ marginLeft: 5 }}
                  >
                    <Feather
                      name="trash-2"
                      size={20}
                      color={vitima.odontograma[regiao].length === 1 ? '#ccc' : 'red'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={() => addOdontogramaItem(regiao)}>
                <Text style={styles.addOdontogramaText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Anotações do Odontograma</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={vitima.anotacoesOdontograma}
            onChangeText={(text) => handleVitimaChange('anotacoesOdontograma', text)}
            multiline
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#001F54' }]}
              onPress={addVitimaToCaso}
            >
              <Text style={styles.submitText}>Salvar Vítima</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#001F54' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {showPicker && (
        <DateTimePicker
          value={caso.dataHora}
          mode={modePicker}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDateTime}
        />
      )} */



