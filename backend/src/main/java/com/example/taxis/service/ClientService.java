package com.example.taxis.service;

import com.example.taxis.service.dto.ClientDto;

import java.util.List;

public interface ClientService {

    List<ClientDto> getAllClients();

    ClientDto createClient(ClientDto clientDto);

    ClientDto updateClient(Integer id, ClientDto clientDto);

    void deleteClient(Integer id);
}

