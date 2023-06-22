package com.example.taxis.service.impl;

import com.example.taxis.entity.ClientEntity;
import com.example.taxis.repository.ClientRepository;
import com.example.taxis.service.ClientService;
import com.example.taxis.service.dto.ClientDto;
import com.example.taxis.service.mapper.ClientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Override
    public List<ClientDto> getAllClients() {
        List<ClientDto> clients = clientRepository.findAll().stream().map(client -> entiyToDto(client)).collect(Collectors.toList());
        return clients;
    }

    @Override
    public ClientDto createClient(ClientDto clientDto) {
        ClientEntity client = clientRepository.save(dtoToEntity(clientDto));
        return entiyToDto(client);
    }

    @Override
    public ClientDto updateClient(Integer id, ClientDto clientDto) {
        Optional<ClientEntity> client = clientRepository.findById(id);

        if (client == null) {
            throw new NoSuchElementException("Client not found id: " + id);
        }

        client.get().setName(clientDto.getName());
        client.get().setLastName(clientDto.getLastName());
        client.get().setPhone(clientDto.getPhone());
        client.get().setHomeLocation(clientDto.getHomeLocation());
        client.get().setWorkLocation(clientDto.getWorkLocation());
        client.get().setTotalFinished(clientDto.getTotalFinished());
        client.get().setTotalRides(clientDto.getTotalRides());
        client.get().setFileUrl(clientDto.getFileUrl());

        ClientEntity updatedClient = clientRepository.save(client.get());

        return entiyToDto(updatedClient);
    }

    @Override
    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    ClientDto entiyToDto(ClientEntity entity) {
        return ClientMapper.INSTANCE.toClientDto(entity);
    }

    ClientEntity dtoToEntity(ClientDto dto) {
        return ClientMapper.INSTANCE.toClientEntity(dto);
    }
}
